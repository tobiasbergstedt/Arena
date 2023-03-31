import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import CookieConsent /*, { getCookieConsentValue }*/ from 'react-cookie-consent';
import ReactGA from 'react-ga';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import { GA_TRACKING_ID } from 'config/settings';

import { ReactComponent as CookieIcon } from 'assets/icons/cookies.svg';

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
    initial: {
      y: 'calc(var(--inner-height) + 40px)',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 50, delay: 0.5 },
    },
    after: {
      y: 'calc(var(--inner-height) + 40px)',
      opacity: 0,
      transition: { duration: 0.4 },
    },
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
          className={styles.animBox}
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
            <h5 className={styles.heading}>
              <CookieIcon className={styles.cookieIcon} />
              {t('cookieBanner.heading')}
            </h5>
            <p className={styles.paragraph}>{t('cookieBanner.text')}</p>
          </CookieConsent>
        </motion.div>
      ) : (
        <></>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
