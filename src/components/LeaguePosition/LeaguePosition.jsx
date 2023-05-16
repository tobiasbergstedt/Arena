import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object } from 'prop-types';

import fixUrl from 'utils/fix-url';

import ItemHeadings from 'components/ItemHeadings/ItemHeadings';

import styles from './LeaguePosition.module.scss';

const LeaguePosition = ({ userTeam }) => {
  const [division, setDivision] = useState('');
  const [isImperialLeague, setIsImperialLeague] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const getDivisions = async () => {
      if (userTeam) {
        const response = await fetch(fixUrl('/divisions'));
        const apiData = await response.json();
        const filteredDivision = apiData?.filter(function (entry) {
          return entry.id === userTeam?.divisionID;
        });
        if (filteredDivision[0].division === 0) {
          setIsImperialLeague(true);
          setDivision('Imperial League');
        } else {
          setIsImperialLeague(false);
          setDivision(`Division ${filteredDivision[0].division}`);
        }
      }
    };
    getDivisions();
  }, []);

  return (
    <div className={styles.leaguePositionWrapper}>
      <ItemHeadings
        heading={t('landing.leaguePosition')}
        subHeading={division && division}
        isAllCapsSubHeading
      />
      {/* <div className={`goldenText`}>{t('landing.leaguePosition')}</div>
      <span className={styles.topHeading}>Division 1</span> */}
      <p className={styles.leagueName}>
        {division && !isImperialLeague && division.split(' ').pop()}
      </p>
      <div className={styles.leaguePosition}>
        <span className={styles.position}>#1</span>
        <table className={styles.statistics}>
          <tbody>
            <tr>
              <th>{t('landing.wins')}</th>
              <th>{t('landing.draws')}</th>
              <th>{t('landing.losses')}</th>
              <th>{t('landing.plusMinus')}</th>
              <th>{t('landing.points')}</th>
            </tr>
            <tr>
              <td>11</td>
              <td>0</td>
              <td>0</td>
              <td>22</td>
              <td>22</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

LeaguePosition.propTypes = {
  userTeam: object,
};

export default LeaguePosition;
