import { useTranslation } from 'react-i18next';
import { object } from 'prop-types';

import ItemHeadings from 'components/ItemHeadings/ItemHeadings';
import styles from './TransferHistory.module.scss';

const TransferHistory = ({ player, userTeam }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.transferHistory}>
      <ItemHeadings
        heading={t('playerProfile.transfer')}
        subHeading={t('playerProfile.history')}
      />
      {player?.transferHistory?.length > 0 ? (
        <div className={styles.historyText}>
          {player.transferHistory.map(({ date, soldBy, boughtBy, sum }) => (
            <div className={styles.historyItem} key={date + sum + soldBy}>
              <p className="goldenText">{date}</p>
              <p>
                {t('playerProfile.from')}: {soldBy}
              </p>
              <p>
                {t('playerProfile.to')}:{' '}
                {boughtBy ? boughtBy : userTeam.teamName}
              </p>
              <p>
                {t('playerProfile.sum')}: {sum.toLocaleString()}{' '}
                {t('global.gold')}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.historyText}>
          {t('playerProfile.loyalHistory', {
            playerName: player.name,
            teamName: userTeam.teamName,
          })}
        </p>
      )}
    </div>
  );
};

TransferHistory.propTypes = {
  player: object,
  userTeam: object,
};

TransferHistory.defaultProps = {
  player: {},
  userTeam: {},
};

export default TransferHistory;
