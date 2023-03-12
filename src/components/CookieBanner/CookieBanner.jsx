import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import CookieConsent /*, { getCookieConsentValue }*/ from 'react-cookie-consent';
import ReactGA from 'react-ga';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import { GA_TRACKING_ID } from 'config/settings';

import styles from './CookieBanner.module.scss';

const CookieBanner = () => {
  const [isCookieBannerVisible, setIsCookieBannerVisible] = useState(true);

  const { t } = useTranslation();

  const isDevEnvironment = import.meta.env.DEV;

  const initReactGA = () => {
    //initialize google analytics
    ReactGA.initialize(GA_TRACKING_ID, { testMode: isDevEnvironment });
  };

  const handleAcceptCookie = () => {
    initReactGA();
    setIsCookieBannerVisible(!isCookieBannerVisible);
  };

  const handleDeclineCookie = () => {
    //remove google analytics cookies
    Cookies.remove('_ga');
    Cookies.remove('_gat');
    Cookies.remove('_gid');
    setIsCookieBannerVisible(!isCookieBannerVisible);
  };

  useEffect(() => {
    if (Cookies.get('CookieConsent')) {
      setIsCookieBannerVisible(false);
    }
  }, []);

  const animVariants = {
    initial: { x: -1000, opacity: 0, transition: { delay: 2 } },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1.5, delay: 0.5 },
    },
    after: { x: 1000, opacity: 0, transition: { duration: 2 } },
  };

  return (
    <AnimatePresence>
      {isCookieBannerVisible ? (
        <motion.div
          key={'cookieConsentWrapper'}
          variants={animVariants}
          initial="initial"
          animate="visible"
          exit="after"
        >
          <CookieConsent
            containerClasses={styles.cookieContainer}
            contentClasses={styles.cookieContent}
            buttonWrapperClasses={styles.buttonContainer}
            buttonClasses={styles.buttonClasses}
            declineButtonClasses={styles.declineButtonClasses}
            enableDeclineButton
            buttonText={t('cookieBanner.accept')}
            declineButtonText={t('cookieBanner.decline')}
            onAccept={handleAcceptCookie}
            onDecline={handleDeclineCookie}
            disableStyles
            hideOnAccept={false}
            hideOnDecline={false}
          >
            <span>{t('cookieBanner.heading')}</span>
            {t('cookieBanner.text')}
          </CookieConsent>
        </motion.div>
      ) : (
        <></>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
