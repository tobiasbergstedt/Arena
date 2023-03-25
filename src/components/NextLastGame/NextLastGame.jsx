import { string, bool } from 'prop-types';

import styles from './NextLastGame.module.scss';

const NextLastGame = ({ teamLogoHome, teamLogoAway, isLastGame }) => {
  return (
    <div className={styles.nextGameWrapper}>
      <p className={`goldenText ${styles.menuSubHeading}`}>
        {isLastGame ? 'Last game - Division 1' : 'Next game - Division 1'}
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
        <div className={styles.gameInfo}>
          <div className={styles.teamNamesWrapper}>
            <p className={styles.thick}>Behemot Bashers</p>
            <p className={styles.versus}>vs</p>
            <p className={styles.thick}>Twin Peaks</p>
          </div>
          {isLastGame && (
            <div className={styles.teamNamesWrapper}>
              <p className={styles.thick}>3</p>
              <p className={styles.versus}>-</p>
              <p className={styles.thick}>2</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

NextLastGame.propTypes = {
  teamLogoHome: string,
  teamLogoAway: string,
  isLastGame: bool,
};

export default NextLastGame;
