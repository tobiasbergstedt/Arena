import { useTranslation } from 'react-i18next';

import styles from './LeaguePosition.module.scss';
import ItemHeadings from 'components/ItemHeadings/ItemHeadings';

const LeaguePosition = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.leaguePositionWrapper}>
      <ItemHeadings
        heading={t('landing.leaguePosition')}
        subHeading={'Division 1'}
        isAllCapsSubHeading
      />
      {/* <div className={`goldenText`}>{t('landing.leaguePosition')}</div>
      <span className={styles.topHeading}>Division 1</span> */}
      <p className={styles.leagueName}>Berunia</p>
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

export default LeaguePosition;
