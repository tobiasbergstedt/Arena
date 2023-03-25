import React, { useContext } from 'react';
import { string } from 'prop-types';
import { useTranslation } from 'react-i18next';

import { AppContext } from 'context/AppContext';
import { HomeContext } from 'context/HomeContext';
import clsx from 'clsx';

import styles from './CountDown.module.scss';

const CountDown = ({ prizeValue }) => {
  const { appConfig } = useContext(AppContext);
  const { displayCountdownClock } = useContext(HomeContext);
  const { t } = useTranslation();

  return (
    <div
      className={clsx(styles.countDownWrapper, {
        [styles.isHidden]: !displayCountdownClock,
      })}
    >
      <p className={styles.text}>{t('countDown.gameStart')}</p>
      <p className={styles.text}>
        {t('countDown.prizeValue')} {prizeValue} {appConfig?.currencyCode}
      </p>
    </div>
  );
};

CountDown.propTypes = {
  prizeValue: string.isRequired,
};

export default CountDown;
