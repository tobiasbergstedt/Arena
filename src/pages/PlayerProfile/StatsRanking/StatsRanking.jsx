import { useTranslation } from 'react-i18next';
import { object, string, func } from 'prop-types';

import LineStats from 'components/Charts/LineStats/LineStats';
import ItemHeadings from 'components/ItemHeadings/ItemHeadings';
import Select from 'components/inputs/Select/Select';

import styles from './StatsRanking.module.scss';

const StatsRanking = ({ player, statsSelectValue, setStatsSelectValue }) => {
  const { t } = useTranslation();

  const selectValues = {
    options: [
      t('statistics.goals'),
      t('statistics.hoops'),
      t('statistics.intercepts'),
      t('statistics.assists'),
      t('statistics.saves'),
      t('statistics.blocks'),
    ],
    label: t('statistics.goals'),
  };

  return (
    <div className={styles.statsRanking}>
      <ItemHeadings
        heading={t('playerProfile.stats')}
        subHeading={t('playerProfile.ranking')}
      />
      <div className={styles.selectWrapper}>
        <Select
          value={statsSelectValue}
          options={selectValues.options}
          onChange={(data) => {
            setStatsSelectValue(data);
          }}
          label={selectValues.label}
          isSmall
        />
      </div>
      <div className={styles.lineStats}>
        <LineStats
          data={
            player.statsRanking &&
            player.statsRanking[statsSelectValue.toLowerCase()]
          }
          labels={
            player.statsRanking &&
            player.statsRanking[statsSelectValue.toLowerCase()]
          }
        />
        <p className={styles.round}>{t('playerProfile.round')}</p>
      </div>
    </div>
  );
};

StatsRanking.propTypes = {
  player: object,
  statsSelectValue: string,
  setStatsSelectValue: func,
};

StatsRanking.defaultProps = {
  player: {},
  statsSelectValue: '',
  setStatsSelectValue: () => {},
};

export default StatsRanking;
