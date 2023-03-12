import { func } from 'prop-types';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button/Button';
import { ReactComponent as CloseIcon } from 'assets/icons/close-cross-white.svg';
import { ReactComponent as BankIDLogo } from 'assets/icons/bankid-blue.svg';
import { ReactComponent as GlobeIcon } from 'assets/icons/globe-white.svg';

import styles from './BankIDLogin.module.scss';

const BankIDLogin = ({ onClose, onContinue, onContinueDev }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.loginWrapper}>
      <CloseIcon
        className={styles.closeIcon}
        onClick={() => {
          onClose();
        }}
      />
      <div className={styles.bankIDLogoWrapper}>
        <BankIDLogo className={styles.logoIcon} />
      </div>
      <h1>{t('login.openBankIDHeading')}</h1>
      <p className={styles.paragraph}>{t('login.openBankIDText')}</p>
      <GlobeIcon className={styles.globeIcon} />
      <Button isBlueButton onClick={onContinue}>
        {t('login.openBankIDButton')}
      </Button>
      <Button
        isBlueButton
        className={styles.devLoginButton}
        onClick={onContinueDev}
      >
        {t('login.openDevLoginButton')}
      </Button>
    </div>
  );
};

BankIDLogin.propTypes = {
  onClose: func,
  onContinue: func,
  onContinueDev: func,
};

BankIDLogin.defaultProps = {
  onClose: null,
  onContinue: null,
  onContinueDev: null,
};

export default BankIDLogin;
