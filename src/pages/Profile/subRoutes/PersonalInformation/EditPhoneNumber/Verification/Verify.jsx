import { func, string } from 'prop-types';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button/Button';
import InputSMSAuth from 'components/inputs/InputSMSAuth/InputSMSAuth';

import styles from './Verify.module.scss';
import { useContext } from 'react';
import { EditContext } from 'context/EditContext';

const SendVerification = ({
  phoneNumber,
  formattedPhoneNumber,
  setIsVerified,
  verificationBody,
}) => {
  const { setStep } = useContext(EditContext);
  const { t } = useTranslation();

  return (
    <>
      <p className={styles.paragraph}>
        {t('profilePage.personalInfo.verificationSent')}
        {'\n'}
        <strong>{phoneNumber}</strong>
      </p>
      <InputSMSAuth
        setStep={setStep}
        formattedPhoneNumber={formattedPhoneNumber}
        setIsVerified={setIsVerified}
        verificationBody={verificationBody}
      />
      <p className={styles.secondParagraph}>
        {t('profilePage.personalInfo.noCodeText')}
      </p>
      <Button isText isRedText>
        {t('profilePage.personalInfo.sendNewCodeButton')}
      </Button>
    </>
  );
};

SendVerification.propTypes = {
  phoneNumber: string.isRequired,
  formattedPhoneNumber: string.isRequired,
  setIsVerified: func,
  verificationBody: func,
};

SendVerification.defaultProps = {
  setIsVerified: () => {},
  verificationBody: () => {},
};

export default SendVerification;
