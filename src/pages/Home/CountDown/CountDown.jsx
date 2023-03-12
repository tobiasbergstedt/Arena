import React, { useContext, useState } from 'react';
import { string } from 'prop-types';
import { useTranslation } from 'react-i18next';

import { AppContext } from 'context/AppContext';
import { HomeContext } from 'context/HomeContext';
import calculateTimeLeft from 'utils/calculate-time-left';
import useInterval from 'hooks/useInterval';
import clsx from 'clsx';

import styles from './CountDown.module.scss';

const CountDown = ({ prizeValue }) => {
  const { appConfig, nextShowData } = useContext(AppContext);
  const { displayCountdownClock } = useContext(HomeContext);
  const { t } = useTranslation();
  const [time, setTime] = useState('00:00:00');

  const tick = () => {
    const newTimeObj = calculateTimeLeft(
      new Date(nextShowData.nextShowStartUtc)
    );
    setTime(`${newTimeObj.hours}:${newTimeObj.minutes}:${newTimeObj.seconds}`);
  };

  useInterval(
    tick,
    nextShowData && nextShowData.nextShowStartUtc ? 1000 : null
  );

  return (
    <div
      className={clsx(styles.countDownWrapper, {
        [styles.isHidden]: !displayCountdownClock,
      })}
    >
      <p className={styles.text}>{t('countDown.gameStart')}</p>
      <div
        className={clsx(styles.countDown, {
          [styles.notVisible]: time === '00:00:00',
        })}
      >
        {time}
      </div>
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
