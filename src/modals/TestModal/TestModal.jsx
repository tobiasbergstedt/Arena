import Modal from 'modals/Modal/Modal';
import { useTranslation } from 'react-i18next';

import styles from './TestModal.module.scss';

const TestModal = () => {
  const { t } = useTranslation();

  return (
    <Modal hasCloseButton={true}>
      <div className={styles.wrapper}>
        <h3>{t('modals.testModal.heading')}</h3>
        <p>{t('modals.testModal.text')}</p>
      </div>
    </Modal>
  );
};

export default TestModal;
