import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { bool, func } from 'prop-types';

import MenuSection from 'components/SideMenu/MenuSection/MenuSection';
import Copyright from 'components/Copyright/Copyright';

import CloseCross from 'assets/icons/close-cross.svg';
import TeamLogoHome from 'assets/images/behemot_bashers.png';
import TeamLogoAway from 'assets/images/wysiwyg.png';

import styles from './SideMenu.module.scss';

import NextLastGame from 'components/NextLastGame/NextLastGame';
import gameMenuItems from 'components/SideMenu/MenuItems/gameMenuItems';
import aboutTheGameItems from 'components/SideMenu/MenuItems/AboutTheGameItems';
import UserMenu from 'components/SideMenu/UserMenu/UserMenu';
import UserSection from 'components/SideMenu/UserSection/UserSection';
import { useContext } from 'react';
import { UserContext } from 'context/UserContext';
import { useTranslation } from 'react-i18next';

const SideMenu = ({ isSideMenuOpen, setIsSideMenuOpen }) => {
  const location = useLocation();
  const slugs = location.pathname?.split('/') ?? [];
  const navigate = useNavigate();
  const { logout } = useContext(UserContext);
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  const animVariants = {
    initial: {
      left: '-100vw',
    },
    visible: {
      left: '0px',
      transition: { duration: 1 },
    },
    after: { left: '-100vw', transition: { duration: 1 } },
  };

  return (
    <AnimatePresence>
      {isSideMenuOpen && (
        <motion.div
          key="sideMenu"
          variants={animVariants}
          initial="initial"
          animate="visible"
          exit="after"
          className={styles.sideMenu}
          style={{ height: window.innerHeight }}
        >
          <div className={styles.sideMenuContent}>
            <div className={styles.topWrapper}>
              <div className={styles.headingWrapper}>
                <h2>Arena Logo</h2>
                <div
                  className={styles.closeCross}
                  style={{
                    maskImage: `url(${CloseCross})`,
                    WebkitMaskImage: `url(${CloseCross})`,
                  }}
                  onClick={() => setIsSideMenuOpen(false)}
                />
              </div>
              <UserSection onClick={handleLogout} />
            </div>
            <UserMenu slugs={slugs} />
            <NextLastGame
              teamLogoHome={TeamLogoHome}
              teamLogoAway={TeamLogoAway}
            />
            <MenuSection
              heading={t('menu.gameMenu')}
              items={gameMenuItems}
              slugs={slugs}
            />
            <MenuSection
              heading={t('menu.aboutMenu')}
              items={aboutTheGameItems}
              slugs={slugs}
            />
            <Copyright />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

SideMenu.propTypes = {
  isSideMenuOpen: bool,
  setIsSideMenuOpen: func,
};

export default SideMenu;
