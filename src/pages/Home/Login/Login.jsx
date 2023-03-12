import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { bool, func } from 'prop-types';

import SpinnerGlobe from 'components/SpinnerGlobe/SpinnerGlobe';

import DevLogin from 'pages/Home/Login/DevLogin/DevLogin';
import BankIDLogin from 'pages/Home/Login/BankIDLogin/BankIDLogin';
import LoggedInSuccess from 'pages/Home/Login/LoggedInSuccess/LoggedInSuccess';

import styles from './Login.module.scss';

const Login = ({ isLoggedIn, isLoginVisible, setIsLoginVisible, onClose }) => {
  const [isDevLoginVisible, setIsDevLoginVisible] = useState(true);
  const [isBankIDLoginVisible, setIsBankIDLoginVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const animShowHide = {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: { duration: 0.25 },
    },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    if (isLoggedIn) {
      setIsDevLoginVisible(false);
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    setIsDevLoginVisible(true);
  }, []);

  return (
    <AnimatePresence>
      {isLoginVisible && (
        <motion.div
          className={styles.loginWrapper}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={animShowHide}
        >
          <AnimatePresence>
            {isBankIDLoginVisible && (
              <motion.span
                key="bankIDWrapper"
                variants={animShowHide}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <BankIDLogin
                  onClose={() => {
                    onClose();
                  }}
                  onContinue={() => {
                    setIsBankIDLoginVisible(false);
                  }}
                  onContinueDev={() => {
                    setIsBankIDLoginVisible(false);
                    setIsDevLoginVisible(true);
                  }}
                />
              </motion.span>
            )}
            {isDevLoginVisible && (
              <motion.span
                key="DevLoginWrapper"
                variants={animShowHide}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <DevLogin
                  onClose={() => {
                    setIsDevLoginVisible(true);
                    setIsBankIDLoginVisible(false);
                    setIsLoginVisible(false);
                  }}
                  onSuccess={() => {
                    setIsDevLoginVisible(false);
                    setIsBankIDLoginVisible(false);
                    setIsLoading(true);
                  }}
                />
              </motion.span>
            )}
            {isLoading && (
              <motion.div
                key="SpinnerGlobeWrapper"
                variants={animShowHide}
                initial="initial"
                animate="enter"
                exit="exit"
                className={styles.loading}
              >
                <SpinnerGlobe />
              </motion.div>
            )}
            {isLoggedIn && (
              <motion.span
                key="LoggedInSuccessWrapper"
                variants={animShowHide}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <LoggedInSuccess
                  onClose={() => {
                    setIsDevLoginVisible(true);
                    setIsBankIDLoginVisible(false);
                    setIsLoginVisible(false);
                  }}
                />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Login.propTypes = {
  isLoggedIn: bool,
  isLoginVisible: bool,
  setIsLoginVisible: func,
  onClose: func,
};

Login.defaultProps = {
  isLoggedIn: false,
  isLoginVisible: false,
  setIsLoginVisible: () => {},
};

export default Login;
