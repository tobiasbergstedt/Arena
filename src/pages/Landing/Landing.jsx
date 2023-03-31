import Page from 'components/Page/Page';
import NextLastGame from 'components/NextLastGame/NextLastGame';
import LatestNews from 'components/News/LatestNews/LatestNews';

import TeamLogoHome from 'assets/images/behemot_bashers.png';
import TeamLogoAway from 'assets/images/wysiwyg.png';

import styles from './Landing.module.scss';
import LeaguePosition from 'components/LeaguePosition/LeaguePosition';

const Landing = () => {
  return (
    <Page className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.topSection}>
          <div className={styles.timeDateAndOnline}>
            <span>2023-03-22 12:15:43</span>
            <span>173 online</span>
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
