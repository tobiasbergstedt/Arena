import { useContext, useEffect, useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { UserContext } from 'context/UserContext';
import convertPosition from 'utils/convert-position';
import fixUrl from 'utils/fix-url';

import ItemHeadings from 'components/ItemHeadings/ItemHeadings';
import LineStats from 'components/Charts/LineStats/LineStats';
import DonutStatsMultiple from 'components/Charts/DonutStats/DonutStatsMultiple';
import Spinner from 'components/Spinner/Spinner';
import History from './History/History';
import TeamInfo from './TeamInfo/TeamInfo';

import styles from './Club.module.scss';

const Club = () => {
  const { userTeam } = useContext(UserContext);
  const [division, setDivision] = useState('');

  const { t } = useTranslation();

  const donutColors = ['#15c8ef', '#f4e471', '#00dc5a', '#83409a'];
  const races = [
    t('login.races.elves'),
    t('login.races.dwarves'),
    t('login.races.humans'),
    t('login.races.orcs'),
  ];

  useEffect(() => {
    const getDivisions = async () => {
      if (userTeam) {
        const response = await fetch(fixUrl('/divisions'));
        const apiData = await response.json();
        const filteredDivision = apiData?.filter(function (entry) {
          return entry.id === userTeam?.divisionID;
        });

        setDivision(filteredDivision[0].name);
      }
    };
    getDivisions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!division ? (
        <div className={styles.isLoading}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.clubWrapper}>
          <TeamInfo division={division} />
          <div className={styles.leaguePositions}>
            <ItemHeadings
              heading={t('club.league')}
              subHeading={t('club.positions')}
            />
            <div className={styles.lineStats}>
              <LineStats
                data={
                  userTeam.leaguePositionHistory &&
                  userTeam.leaguePositionHistory
                }
              />
            </div>
          </div>
          <div className={styles.supporters}>
            <ItemHeadings
              heading={t('club.dedicated')}
              subHeading={t('club.supportersClub')}
            />
            <div className={styles.supportersInfo}>
              <p>
                {t('club.supporterSize')}: {userTeam.supporterNumbers}
              </p>
              <p>
                {t('club.supporterExpectations')}:{' '}
                {convertPosition(userTeam.fanExpectations)}
              </p>
              <p>
                {t('club.fanFavorite')}: {userTeam.fanFavorite}
              </p>
            </div>
            <div className={styles.donut}>
              <DonutStatsMultiple
                colors={donutColors}
                data={userTeam.supporterDistribution}
              />
            </div>
            <p>{t('club.raceDistribution')}:</p>
            <div className={styles.raceDistribution}>
              {userTeam.supporterDistribution.map((race, index) => (
                <div className={styles.raceObject} key={race + races[index]}>
                  <div className={styles.left}>
                    <div
                      className={styles.indicator}
                      style={{ backgroundColor: donutColors[index] }}
                    />
                    <p>{races[index]}</p>
                  </div>
                  <p>{userTeam.supporterDistribution[index]}%</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.historyAndAwards}>
            <History
              historyArray={userTeam.teamHistory}
              heading={t('club.team')}
              subHeading={t('club.history')}
              labels={[
                t('club.season'),
                t('club.league'),
                t('club.position'),
                t('club.points'),
              ]}
              values={[
                t('club.season'),
                t('club.league'),
                t('club.position'),
                t('club.points'),
              ]}
              convertComparison={[t('club.position')]}
              noHistory={t('club.noTeamHistory')}
            />
            <History
              historyArray={userTeam.playerAwardsHistory}
              heading={t('club.player')}
              subHeading={t('club.awards')}
              labels={[
                t('club.season'),
                t('club.player'),
                t('club.role'),
                t('club.place'),
              ]}
              values={[
                t('club.season'),
                t('club.player'),
                t('club.role'),
                t('club.place'),
              ]}
              convertComparison={[t('club.place')]}
              noHistory={t('club.noAwardsHistory')}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Club;
