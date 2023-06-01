import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { object, string } from 'prop-types';

import DonutStats from 'components/Charts/DonutStats/DonutStats';
import ItemHeadings from 'components/ItemHeadings/ItemHeadings';

import styles from './PersonalStatistics.module.scss';

const PersonalStatistics = ({ player, statsSelectValue }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.personalStats}>
      <ItemHeadings
        heading={t('playerProfile.personal')}
        subHeading={t('playerProfile.statistics')}
      />
      <div className={styles.personalStatsContent}>
        <div className={styles.left}>
          <p className={styles.personalStatsSubHeading}>
            {t(`statistics.${statsSelectValue.toLowerCase()}`)}
          </p>
          <p className={clsx(`goldenText`, styles.attemptsSuccessful)}>
            {t('playerProfile.attempts')}
          </p>
          <p className={styles.personalStatsNumbers}>
            {player.attempts && player.attempts[statsSelectValue.toLowerCase()]}
          </p>
          <p className={clsx(`goldenText`, styles.attemptsSuccessful)}>
            {t('playerProfile.successful')}
          </p>
          <p className={styles.personalStatsNumbers}>
            {player.stats && player.stats[statsSelectValue.toLowerCase()]}
          </p>
        </div>
        <div className={styles.right}>
          <DonutStats
            attempts={
              player.attempts && player.attempts[statsSelectValue.toLowerCase()]
            }
            successful={
              player.stats && player.stats[statsSelectValue.toLowerCase()]
            }
          />
          <p className={styles.percentage}>
            {player.attempts &&
            player.stats &&
            !isNaN(
              player.stats[statsSelectValue.toLowerCase()] /
                player.attempts[statsSelectValue.toLowerCase()]
            )
              ? Math.round(
                  (player.stats[statsSelectValue.toLowerCase()] /
                    player.attempts[statsSelectValue.toLowerCase()]) *
                    100
                )
              : 100}
            %
          </p>
        </div>
      </div>
    </div>
  );
};

PersonalStatistics.propTypes = {
  player: object,
  statsSelectValue: string,
};

PersonalStatistics.defaultProps = {
  player: {},
  statsSelectValue: '',
};

export default PersonalStatistics;
