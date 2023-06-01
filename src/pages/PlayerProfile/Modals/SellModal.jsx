import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object, func, instanceOf } from 'prop-types';

import fixUrl from 'utils/fix-url';

import Modal from 'modals/Modal/Modal';
import InputText from 'components/inputs/InputText/InputText';
import Button from 'components/Button/Button';

import styles from './Modals.module.scss';

const SellModal = ({ player, setModalVisible, today }) => {
  const [startingBid, setStartingBid] = useState(0);

  const { t } = useTranslation();

  const handleSellPlayer = async () => {
    var inOneWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7,
      today.getHours(),
      today.getMinutes()
    );
    const newTransferPlayer = {
      bid: [startingBid],
      bidder: [''],
      endDate: inOneWeek,
      playerId: player.id,
    };

    await fetch(fixUrl('/players/transferlist'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransferPlayer),
    });
    // setModalVisible('NONE');
  };

  return (
    <Modal canClose onClick={() => setModalVisible('NONE')}>
      <div className={styles.modalContent}>
        <h3>
          {t('playerProfile.sell')} {player.name}?
        </h3>
        <p>
          {t('playerProfile.transferListInfo', {
            playerName: player.name,
          })}
        </p>
        <p className={styles.deadline}>
          {t('marketplace.deadline')}{' '}
          {new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 7,
            today.getHours(),
            today.getMinutes(),
            today.getSeconds()
          ).toLocaleString(t('global.localeString'))}
        </p>
        <p>({t('playerProfile.endDateInfo')})</p>
        <p>{t('playerProfile.transferInfo')}.</p>
      </div>
      <div className={styles.buttonsWrapper}>
        <InputText
          type="tel"
          isLight
          label={t('playerProfile.startingBid')}
          onChange={(value) => setStartingBid(Number(value))}
        />
        <Button isTertiary onClick={() => handleSellPlayer()}>
          {t('playerProfile.sell')}
        </Button>
        <Button isQuaternary onClick={() => setModalVisible('NONE')}>
          {t('buttons.cancel')}
        </Button>
      </div>
    </Modal>
  );
};

SellModal.propTypes = {
  player: object,
  setModalVisible: func,
  today: instanceOf(Date),
};

SellModal.defaultProps = {
  player: {},
  setModalVisible: () => {},
  today: new Date(),
};

export default SellModal;
