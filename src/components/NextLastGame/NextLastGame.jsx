import { useEffect, useState } from 'react';
import { string, bool, object } from 'prop-types';
import { useTranslation } from 'react-i18next';

import fixUrl from 'utils/fix-url';

import styles from './NextLastGame.module.scss';

const NextLastGame = ({ TeamLogoHome, TeamLogoAway, isLastGame, userTeam }) => {
  const { t } = useTranslation();
  const [division, setDivision] = useState([]);
  // const [thisSeason, setThisSeason] = useState({});
  // const [lastGame, setLastGame] = useState({});
  // const [nextGame, setNextGame] = useState({});

  // const findLastGame = (obj, fixedAmount) => {
  //   let lastItem = null;
  //   for (let key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       const value = obj[key];
  //       if (value < fixedAmount) {
  //         lastItem = { key, value };
  //       }
  //     }
  //   }
  //   return lastItem.key;
  // };

  // const findNextGame = (obj, fixedAmount) => {
  //   let nextItem = null;
  //   for (let key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       const value = obj[key];
  //       if (value > fixedAmount) {
  //         nextItem = { key, value };
  //       }
  //     }
  //   }
  //   return nextItem.key;
  // };

  useEffect(() => {
    const getDivisions = async () => {
      if (userTeam) {
        const response = await fetch(fixUrl('/divisions'));
        const apiData = await response.json();
        const filteredDivision = apiData?.filter(function (entry) {
          return entry.id === userTeam?.divisionID;
        });

        // const seasons = filteredDivision[0].seasons;
        // setThisSeason(seasons[`season${Object.keys(seasons).length}`]);

        // setLastGame(
        //   findLastGame(
        //     seasons[`season${Object.keys(seasons).length}`].dates,
        //     '2023-05-06'
        //   )
        // );
        // setNextGame(
        //   findNextGame(
        //     seasons[`season${Object.keys(seasons).length}`].dates,
        //     '2023-05-06'
        //   )
        // );

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
          ? `${t('menu.lastGame')} ${division && division}`
          : `${t('menu.nextGame')} ${division && division}`}
      </p>
      <div className={styles.gameInfoWrapper}>
        <div className={styles.imageOuterContainer}>
          <div className={styles.imageContainer}>
            {/* <img src={teamLogoHome} alt="Behemot Bashers Logo" /> */}
            <TeamLogoHome alt="Behemot Bashers Logo" />
          </div>
        </div>
        <div className={styles.imageOuterContainer}>
          <div className={styles.imageContainer}>
            {/* <img
              src={teamLogoAway}
              alt="Twin Peaks Logo"
              style={{ outline: '2px solid red' }}
            /> */}
            <TeamLogoAway alt="Twin Peaks Logo" />
          </div>
        </div>
        <div className={styles.gameInfo}>
          <div className={styles.teamNamesWrapper}>
            <p className={styles.thick}>
              {isLastGame ? userTeam?.teamName : 'Twin Peaks'}
            </p>
            <p className={styles.versus}>{t('menu.vs')}</p>
            <p className={styles.thick}>
              {isLastGame ? 'Behemot Bashers' : userTeam?.teamName}
            </p>
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
  TeamLogoHome: string,
  TeamLogoAway: string,
  isLastGame: bool,
  userTeam: object,
};

export default NextLastGame;
