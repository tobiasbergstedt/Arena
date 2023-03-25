import React from 'react';
import { func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import useBreakpoint, { MOBILE } from 'hooks/useBreakpoint';

import SpinnerGlobe from 'components/SpinnerGlobe/SpinnerGlobe';
import { ReactComponent as Logo } from 'assets/icons/pangeo-logo.svg';

import styles from './SplashScreen.module.scss';

const SplashScreen = () => {
  const { t } = useTranslation();
  const breakpoint = useBreakpoint();

  return (
    <div className={styles.splashScreenWrapper}>
      <div className={styles.contentWrapper}>
        <h4 className={styles.header}>{t('splashScreen.heading')}</h4>
        <div className={styles.logoContainer}>
          <SpinnerGlobe
            className={styles.spinningLogo}
            isSmall={breakpoint === MOBILE}
            isMedium={breakpoint !== MOBILE}
          />
          <Logo className={styles.logo} />
        </div>
        <p className={styles.paragraph}>{t('splashScreen.loadingText')}</p>
      </div>
    </div>
  );
};

SplashScreen.propTypes = {
  setIsLoading: func.isRequired,
};

export default SplashScreen;
