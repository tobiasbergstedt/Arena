import NextLastGame from 'components/NextLastGame/NextLastGame';
import LatestNews from 'components/News/LatestNews/LatestNews';
import LeaguePosition from 'components/LeaguePosition/LeaguePosition';

import { ReactComponent as TeamLogoHome } from 'assets/icons/elf_team.svg';
import { ReactComponent as TeamLogoAway } from 'assets/icons/orc_team.svg';

import styles from './Landing.module.scss';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from 'context/UserContext';
import Spinner from 'components/Spinner/Spinner';

const Landing = () => {
  const { userTeam } = useContext(UserContext);
  const [currentTime, setCurrentTime] = useState(new Date());

  const { t } = useTranslation();

  const date = currentTime.toLocaleDateString(t('global.localeString'));

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
    <>
      {userTeam ? (
        <div className={styles.contentWrapper}>
          <div className={styles.topSection}>
            <div className={styles.timeDateAndOnline}>
              <span>{`${date} ${hours}:${minutes}:${seconds}`}</span>
              <span>173 {t('landing.online')}</span>
            </div>
            <NextLastGame
              TeamLogoAway={TeamLogoAway}
              TeamLogoHome={TeamLogoHome}
              isLastGame
              userTeam={userTeam}
            />
            <LatestNews />
            <LeaguePosition userTeam={userTeam} />
          </div>
        </div>
      ) : (
        <div className={styles.isLoading}>
          <Spinner />
        </div>
      )}
    </>
    // </Page>
  );
};

export default Landing;
