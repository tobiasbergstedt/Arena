import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import throttle from 'lodash.throttle';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import useBreakpoint, { MOBILE } from 'hooks/useBreakpoint';
import { UserContext } from 'context/UserContext';

import GameInfoModal from './Modals/GameInfoModal';

import styles from './Login.module.scss';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

const Login = () => {
  const [displayError, setDisplayError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [isSignIn, setIsSignIn] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === MOBILE;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const toggleHover = () => setIsHovered(!isHovered);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const onResize = throttle(() => {
      setWindowWidth(window.innerWidth);
    }, 50);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/landing');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animVariants = {
    initial: { x: `${windowWidth}px`, opacity: 0 },
    visible: {
      x: '0px',
      opacity: 1,
      transition: { duration: 1 },
    },
    after: { x: `${windowWidth}px`, opacity: 0, transition: { duration: 1 } },
  };

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
      transition: {
        duration: 2,
      },
    },
    out: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      key="pageWrapper"
      className={styles.innerWrapper}
    >
      <div className={styles.backgroundWrapper} />
      <div className={styles.welcomeWrapper}>
        <h2>{t('login.welcome')}</h2>
        <h1 className={clsx('goldenText', styles.headingTitle)}>
          {t('arena')}
        </h1>
        {isMobile ? (
          <>
            <div
              className={styles.infoButton}
              onClick={() => setIsModalVisible(true)}
            >
              <p>{t('login.information')}</p>
            </div>
            <AnimatePresence>
              {isModalVisible && (
                <GameInfoModal
                  setIsModalVisible={setIsModalVisible}
                  toggleHover={toggleHover}
                  isHovered={isHovered}
                  contactLinkStyle={styles.contactLink}
                />
              )}
            </AnimatePresence>
          </>
        ) : (
          <div>
            <p>{t('login.gameDescription1')}</p>
            <p>{t('login.gameDescription2')}</p>
            <p>{t('login.gameDescription3')}</p>
            <p>
              {t('login.gameDescription4')}
              <span
                onMouseEnter={() => toggleHover()}
                onMouseLeave={() => toggleHover()}
                onClick={() =>
                  (window.location.href = `mailto:${t('login.contact')}`)
                }
                className={clsx(styles.contactLink, {
                  ['goldenText']: isHovered,
                })}
              >
                {t('login.contact')}
              </span>
            </p>
          </div>
        )}
      </div>
      <AnimatePresence mode="wait">
        {isSignIn ? (
          <SignIn
            animVariants={animVariants}
            loading={loading}
            setLoading={setLoading}
            displayError={displayError}
            setDisplayError={setDisplayError}
            setIsSignIn={setIsSignIn}
            styles={styles}
            key="signInWrapper"
          />
        ) : (
          <SignUp
            animVariants={animVariants}
            loading={loading}
            setLoading={setLoading}
            displayError={displayError}
            setDisplayError={setDisplayError}
            setIsSignIn={setIsSignIn}
            styles={styles}
            key="signUpWrapper"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Login;
