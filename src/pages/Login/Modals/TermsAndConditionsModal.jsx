import { useTranslation } from 'react-i18next';
import { func } from 'prop-types';

import Modal from 'modals/Modal/Modal';

import styles from './Modal.module.scss';

const TermsAndConditionsModal = ({ setIsModalVisible }) => {
  const { t } = useTranslation();

  return (
    <Modal canClose onClick={() => setIsModalVisible(false)}>
      <div className={styles.modalContent}>
        <div className={styles.heading}>
          <h3 className="goldenText">{t('termsAndConditions.heading')}</h3>
          <p>{t('termsAndConditions.text')}</p>
        </div>
        <ol className={styles.termsAndConditionsList}>
          <li>
            {t('termsAndConditions.listItem1.subHeading')}
            <ol>
              <li>{t('termsAndConditions.listItem1.subItem1')}</li>
              <li>{t('termsAndConditions.listItem1.subItem2')}</li>
            </ol>
          </li>
          <li>
            {t('termsAndConditions.listItem2.subHeading')}
            <ol>
              <li>{t('termsAndConditions.listItem2.subItem1')}</li>
              <li>{t('termsAndConditions.listItem2.subItem2')}</li>
            </ol>
          </li>
          <li>
            {t('termsAndConditions.listItem3.subHeading')}
            <ol>
              <li>{t('termsAndConditions.listItem3.subItem1')}</li>
              <li>{t('termsAndConditions.listItem3.subItem2')}</li>
              <li>{t('termsAndConditions.listItem3.subItem3')}</li>
            </ol>
          </li>
          <li>
            {t('termsAndConditions.listItem4.subHeading')}
            <ol>
              <li>{t('termsAndConditions.listItem4.subItem1')}</li>
              <li>{t('termsAndConditions.listItem4.subItem2')}</li>
            </ol>
          </li>
          <li>
            {t('termsAndConditions.listItem5.subHeading')}
            <ol>
              <li>{t('termsAndConditions.listItem5.subItem1')}</li>
              <li>{t('termsAndConditions.listItem5.subItem2')}</li>
              <li>{t('termsAndConditions.listItem5.subItem3')}</li>
            </ol>
          </li>
          <li>
            {t('termsAndConditions.listItem6.subHeading')}
            <ol>
              <li>{t('termsAndConditions.listItem6.subItem1')}</li>
            </ol>
          </li>
          <li>
            {t('termsAndConditions.listItem7.subHeading')}
            <ol>
              <li>{t('termsAndConditions.listItem7.subItem1')}</li>
            </ol>
          </li>
        </ol>
      </div>
    </Modal>
  );
};

TermsAndConditionsModal.propTypes = {
  setIsModalVisible: func,
};

TermsAndConditionsModal.defaultProps = {
  setIsModalVisible: () => {},
};

export default TermsAndConditionsModal;
