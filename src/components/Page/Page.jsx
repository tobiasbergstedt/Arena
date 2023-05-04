import { useContext, useEffect, useRef, useState } from 'react';
import { node, string } from 'prop-types';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { UserContext } from 'context/UserContext';

import MenuBar from 'components/MenuBar/MenuBar';
import SideMenu from 'components/SideMenu/SideMenu';
import Chat from 'components/Chat/Chat';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as LoggedOutIcon } from 'assets/icons/background-icons/not-logged-in.svg';

import styles from './Page.module.scss';

const Page = ({ children, className, pageTitle }) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

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

  return (
    <div ref={currentHeightRef} className={clsx(styles.pageWrapper, className)}>
      <AnimatePresence mode="wait">
        {user ? (
          <>
            <MenuBar
              isSideMenuOpen={isSideMenuOpen}
              setIsSideMenuOpen={setIsSideMenuOpen}
              isChatOpen={isChatOpen}
              setIsChatOpen={setIsChatOpen}
              title={pageTitle}
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
        ) : (
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
      </AnimatePresence>
    </div>
  );
};

Page.propTypes = {
  children: node.isRequired,
  className: string,
  pageTitle: string,
};

Page.defaultProps = {
  className: null,
  pageTitle: 'Arena',
};

export default Page;
