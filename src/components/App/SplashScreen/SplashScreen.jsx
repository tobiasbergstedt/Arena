import React, { useEffect, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import { func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import useBreakpoint, { MOBILE } from 'hooks/useBreakpoint';

import {
  STORAGE_CONFIG_DATA_KEY,
  STORAGE_NEXT_SHOW_DATA_KEY,
} from 'config/constants';
import { session } from 'utils/storage';

import api from 'api/Config';

import SpinnerGlobe from 'components/SpinnerGlobe/SpinnerGlobe';
import { ReactComponent as Logo } from 'assets/icons/pangeo-logo.svg';

import styles from './SplashScreen.module.scss';

const SplashScreen = ({ setIsLoading }) => {
  const config = api.useGetConfig();
  const nextShow = api.useGetNextShowStart();
  const { setAppConfig, setNextShowData } = useContext(AppContext);
  const { t } = useTranslation();
  const dataCollected = config.isSuccess && nextShow.isSuccess;
  const breakpoint = useBreakpoint();

  useEffect(() => {
    if (dataCollected) {
      setAppConfig(config.data);
      setNextShowData(nextShow.data);
      session.write(STORAGE_CONFIG_DATA_KEY, config.data);
      session.write(STORAGE_NEXT_SHOW_DATA_KEY, nextShow.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataCollected]);

  return (
    <div
      className={clsx(styles.splashScreenWrapper, {
        [styles.animateOut]: dataCollected,
      })}
    >
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
