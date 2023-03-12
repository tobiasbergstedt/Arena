import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AppContext } from 'context/AppContext';

import { ReactComponent as GameBreak } from 'assets/icons/game-top-bar/game-break.svg';
import { ReactComponent as SelfTest } from 'assets/icons/game-top-bar/self-test.svg';
import { ReactComponent as GameLimits } from 'assets/icons/game-top-bar/game-limits.svg';

import styles from './GameTopBar.module.scss';

const GameTopBar = () => {
  const { appConfig } = useContext(AppContext);
  const { t } = useTranslation();

  return (
    <div className={styles.gameTopBar}>
      <a
        className={styles.button}
        target="_blank"
        href={appConfig?.registerGamblePauseURL}
        rel="noreferrer"
      >
        <GameBreak className={styles.icon} />
        <span>{t('gameTopBar.gameBreak')}</span>
      </a>
      <a
        className={styles.button}
        target="_blank"
        href={appConfig?.selftestURL}
        rel="noreferrer"
      >
        <SelfTest className={styles.icon} />
        <span>{t('gameTopBar.selfTest')}</span>
      </a>
      <Link className={styles.button} to={`/profile`}>
        <GameLimits className={styles.icon} />
        <span>{t('gameTopBar.gameLimits')}</span>
      </Link>
    </div>
  );
};

export default GameTopBar;
