import { useTranslation } from 'react-i18next';
import { object } from 'prop-types';

import DonutStats from 'components/Charts/DonutStats/DonutStats';
import ItemHeadings from 'components/ItemHeadings/ItemHeadings';

import styles from './BestPositions.module.scss';

const BestPositions = ({ player }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.bestPositions}>
      <ItemHeadings
        heading={t('playerProfile.bestSuited')}
        subHeading={t('playerProfile.positions')}
      />
      <div className={styles.positionsList}>
        {player.position.map(({ position, fit }) => (
          <div className={styles.positionItem} key={position + fit}>
            <div className={styles.donut}>
              <DonutStats isSmall attempts={100} successful={fit} />
            </div>
            <p>{position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

BestPositions.propTypes = {
  player: object,
};

BestPositions.defaultProps = {
  player: {},
};

export default BestPositions;
