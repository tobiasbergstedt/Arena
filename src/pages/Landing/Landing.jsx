// import { useTranslation } from 'react-i18next';

import Page from 'components/Page/Page';
import NextLastGame from 'components/NextLastGame/NextLastGame';
import LatestNews from 'components/News/LatestNews/LatestNews';
import LeaguePosition from 'components/LeaguePosition/LeaguePosition';

import TeamLogoHome from 'assets/images/behemot_bashers.png';
import TeamLogoAway from 'assets/images/wysiwyg.png';

import styles from './Landing.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Landing = () => {
  // const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());

  const { t } = useTranslation();

  const date = currentTime.toLocaleDateString('sv-SE');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const hours =
    currentTime.getHours() <= 9
      ? `0${currentTime.getHours()}`
      : currentTime.getHours();
  const minutes =
    currentTime.getMinutes() <= 9
      ? `0${currentTime.getMinutes()}`
      : currentTime.getMinutes();
  const seconds =
    currentTime.getSeconds() <= 9
      ? `0${currentTime.getSeconds()}`
      : currentTime.getSeconds();

  return (
    <Page className={styles.wrapper} pageTitle={t('pageTitles.home')}>
      <div className={styles.contentWrapper}>
        <div className={styles.topSection}>
          <div className={styles.timeDateAndOnline}>
            <span>{`${date} ${hours}:${minutes}:${seconds}`}</span>
            {/* <span>173 {t('landing.online')}</span> */}
          </div>
          <NextLastGame
            teamLogoAway={TeamLogoAway}
            teamLogoHome={TeamLogoHome}
            isLastGame
          />
          <LatestNews />
          <LeaguePosition />
        </div>
      </div>
    </Page>
  );
};

export default Landing;
