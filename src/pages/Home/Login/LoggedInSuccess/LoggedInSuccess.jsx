import { useContext } from 'react';
import { func } from 'prop-types';
import { UserContext } from 'context/UserContext';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button/Button';
import { ReactComponent as CheckIcon } from 'assets/icons/check.svg';

import styles from './LoggedInSuccess.module.scss';

const LoggedInSuccess = ({ onClose }) => {
  const { firstName, lastName, recurringUser } = useContext(UserContext);

  const { t } = useTranslation();

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.welcomeWrapper}>
        <CheckIcon className={styles.checkIcon} />
        <h1>
          {recurringUser
            ? `${t('login.welcomeHeading')}`
            : `${t('login.welcomeBackHeading')}`}
        </h1>
        <h3>
          {firstName} {lastName}
        </h3>
      </div>
      <div className={styles.proceedWrapper}>
        {recurringUser && (
          <div className={styles.paragraphWrapper}>
            <p className={styles.paragraphHeading}>
              {t('login.almostDoneHeading')}
            </p>
            <p className={styles.paragraph}>{t('login.almostDoneText')}</p>
          </div>
        )}
        <Button isBlueButton className={styles.bottomButton} onClick={onClose}>
          {t('login.continue')}
        </Button>
      </div>
    </div>
  );
};

LoggedInSuccess.propTypes = {
  onClose: func,
};

LoggedInSuccess.defaultProps = {
  onClose: null,
};

export default LoggedInSuccess;
