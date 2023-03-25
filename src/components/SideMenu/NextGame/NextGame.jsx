import { string } from 'prop-types';

import styles from './NextGame.module.scss';

const NextGame = ({ teamLogoHome, teamLogoAway }) => {
  return (
    <div className={styles.nextGameWrapper}>
      <p className={`goldenText ${styles.menuSubHeading}`}>
        Next game - League
      </p>
      <div className={styles.gameInfoWrapper}>
        <div className={styles.imageOuterContainer}>
          <div className={styles.imageContainer}>
            <img src={teamLogoHome} alt="Behemot Bashers Logo" />
          </div>
        </div>
        <div className={styles.imageOuterContainer}>
          <div className={styles.imageContainer}>
            <img src={teamLogoAway} alt="Twin Peaks Logo" />
          </div>
        </div>
        <div className={styles.teamNamesWrapper}>
          <p className={styles.teamName}>Behemot Bashers</p>
          <p className={styles.versus}>vs</p>
          <p className={styles.teamName}>Twin Peaks</p>
        </div>
      </div>
    </div>
  );
};

NextGame.propTypes = {
  teamLogoHome: string,
  teamLogoAway: string,
};

export default NextGame;
