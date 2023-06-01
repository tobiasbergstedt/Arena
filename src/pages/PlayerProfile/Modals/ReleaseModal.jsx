import { useTranslation } from 'react-i18next';
import { object, func } from 'prop-types';

import fixUrl from 'utils/fix-url';

import Modal from 'modals/Modal/Modal';
import Button from 'components/Button/Button';

import styles from './Modals.module.scss';

const ReleaseModal = ({ player, setModalVisible }) => {
  const { t } = useTranslation();

  const handleDeletePlayer = async (playerID) => {
    await fetch(fixUrl(`/players/${playerID}`), {
      method: 'DELETE',
    });
  };

  return (
    <Modal canClose onClick={() => setModalVisible('NONE')}>
      <div className={styles.modalContent}>
        <h3>
          {t('playerProfile.release')} {player.name}?
        </h3>
        <p>
          {t('playerProfile.confirmDelete', {
            playerName: player.name,
          })}
        </p>
      </div>
      <div className={styles.buttonsWrapper}>
        <Button isTertiary onClick={() => handleDeletePlayer()}>
          {t('buttons.confirm')}
        </Button>
        <Button isQuaternary onClick={() => setModalVisible('NONE')}>
          {t('buttons.cancel')}
        </Button>
      </div>
    </Modal>
  );
};

ReleaseModal.propTypes = {
  player: object,
  setModalVisible: func,
};

ReleaseModal.defaultProps = {
  player: {},
  setModalVisible: () => {},
};

export default ReleaseModal;
