import { useContext, useEffect, useState } from 'react';
import { string, bool } from 'prop-types';
import { useTranslation } from 'react-i18next';

import { UserContext } from 'context/UserContext';
import fixUrl from 'utils/fix-url';

import styles from './NextLastGame.module.scss';

const NextLastGame = ({ teamLogoHome, teamLogoAway, isLastGame }) => {
  const { userTeam } = useContext(UserContext);
  const { t } = useTranslation();
  const [division, setDivision] = useState([]);

  useEffect(() => {
    const getDivisions = async () => {
      if (userTeam) {
        const response = await fetch(fixUrl('/divisions'));
        const apiData = await response.json();
        const filteredDivision = apiData?.filter(function (entry) {
          return entry.id === userTeam?.divisionID;
        });
        // console.log(filteredDivision[0]);
        if (filteredDivision[0].division === 0) {
          setDivision('Imperial League');
        } else {
          setDivision(`Division ${filteredDivision[0].division}`);
        }
      }
    };
    getDivisions();
  }, []);

  return (
    <div className={styles.nextGameWrapper}>
      <p className={`goldenText ${styles.menuSubHeading}`}>
        {isLastGame
          ? `${t('menu.lastGame')} ${division}`
          : `${t('menu.nextGame')} ${division}`}
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
            <p className={styles.versus}>{t('menu.vs')}</p>
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
