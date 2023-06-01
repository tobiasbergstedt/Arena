import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { bool, func, string } from 'prop-types';

import Modal from 'modals/Modal/Modal';

import styles from './Modal.module.scss';

const GameInfoModal = ({
  setIsModalVisible,
  toggleHover,
  isHovered,
  contactLinkStyle,
}) => {
  const { t } = useTranslation();

  return (
    <Modal canClose onClick={() => setIsModalVisible(false)}>
      <div className={styles.modalContent}>
        <h3 className="goldenText">
          {t('login.welcome')} {t('arena')}
        </h3>
        <p>{t('login.gameDescription1')}</p>
        <p>{t('login.gameDescription2')}</p>
        <p>{t('login.gameDescription3')}</p>
        <p>
          {t('login.gameDescription4')}
          <span
            onMouseEnter={() => toggleHover()}
            onMouseLeave={() => toggleHover()}
            onClick={() =>
              (window.location.href = `mailto:${t('login.contact')}`)
            }
            className={clsx(contactLinkStyle, {
              ['goldenText']: isHovered,
            })}
          >
            {t('login.contact')}
          </span>
        </p>
      </div>
    </Modal>
  );
};

GameInfoModal.propTypes = {
  setIsModalVisible: func,
  toggleHover: func,
  isHovered: bool,
  contactLinkStyle: string,
};

GameInfoModal.defaultProps = {
  setIsModalVisible: () => {},
  toggleHover: () => {},
  isHovered: false,
  contactLinkStyle: '',
};

export default GameInfoModal;
