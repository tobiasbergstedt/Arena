import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ModalContext } from 'context/ModalContext';
import { MODAL_TEST } from 'config/constants';

import Page from 'components/Page/Page';
import Button from 'components/Button/Button';

import styles from './Beneficiary.module.scss';

const Beneficiary = () => {
  const { setCurrentModal } = useContext(ModalContext);

  const { t } = useTranslation();

  return (
    <Page className={styles.wrapper}>
      <h1 className={styles.header}>{t('beneficiaryPage.heading')}</h1>
      <Button
        onClick={() => {
          setCurrentModal(MODAL_TEST);
        }}
      >
        {t('beneficiaryPage.showModal')}
      </Button>
    </Page>
  );
};

export default Beneficiary;
