import { useTranslation } from 'react-i18next';
import styles from './Copyright.module.scss';

const Copyright = () => {
  const { t } = useTranslation();

  return (
    <p className={styles.copyRight}>
      {t('copyright.copyright')}{' '}
      <span className={`goldenText`}>{t('copyright.copyrightSymbol')}</span>{' '}
      {t('copyright.copyrightHolder')}
    </p>
  );
};

export default Copyright;
