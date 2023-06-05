import { useContext, useEffect, useRef, useState } from 'react';
import { node, string } from 'prop-types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { UserContext } from 'context/UserContext';

import MenuBar from 'components/MenuBar/MenuBar';
import SideMenu from 'components/SideMenu/SideMenu';
import Chat from 'components/Chat/Chat';
import { useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as LoggedOutIcon } from 'assets/backgrounds/not-logged-in.svg';

import styles from './Page.module.scss';
import { ROUTE_CONSTANTS } from 'config/constants';

const Page = ({ children, className }) => {
  const { user } = useContext(UserContext);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('');
  const [title, setTitle] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const currentHeightRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000);

    if (user) {
      clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const slugs = location.pathname?.split('/') ?? [];
    const activeLocation = slugs[1];
    setActiveRoute(activeLocation);
  }, [location]);

  useEffect(() => {
    const matchedConstant = ROUTE_CONSTANTS.find(
      (constant) => constant.slug === activeRoute
    );
    if (matchedConstant) {
      setTitle(matchedConstant.title);
    } else {
      setTitle('Arena');
    }
  }, [activeRoute]);

  return (
    <div ref={currentHeightRef} className={clsx(styles.pageWrapper, className)}>
      <AnimatePresence mode="wait">
        {user && activeRoute !== '' && (
          <>
            <MenuBar
              isSideMenuOpen={isSideMenuOpen}
              setIsSideMenuOpen={setIsSideMenuOpen}
              isChatOpen={isChatOpen}
              setIsChatOpen={setIsChatOpen}
              title={title}
            />
            <SideMenu
              isSideMenuOpen={isSideMenuOpen}
              setIsSideMenuOpen={setIsSideMenuOpen}
            />
            <Chat
              isChatOpen={isChatOpen}
              setIsChatOpen={setIsChatOpen}
              chatHeight={currentHeightRef?.current?.clientHeight}
            />
            {children && children}
          </>
        )}
        {!user && activeRoute !== '' && (
          <motion.div className={styles.loggedOut}>
            <LoggedOutIcon className={styles.loggedOutIcon} />
            <h2 className={styles.heading}>
              You need to be logged in to view this page.
            </h2>
            <p className={styles.paragraph}>
              {`If you're not being redirected to the login page shortly, you can click `}
              <span className={styles.underline} onClick={() => navigate('/')}>
                here
              </span>
              {` or try refreshing the page.`}
            </p>
          </motion.div>
        )}
        {((!user && activeRoute === '') || (user && activeRoute === '')) && (
          <>{children && children}</>
        )}
      </AnimatePresence>
    </div>
  );
};

Page.propTypes = {
  children: node.isRequired,
  className: string,
};

Page.defaultProps = {
  className: null,
};

export default Page;
