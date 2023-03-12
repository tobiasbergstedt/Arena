import { useContext } from 'react';
import { func, string } from 'prop-types';
import { useTranslation } from 'react-i18next';

import { UserContext } from 'context/UserContext';
import { EditContext } from 'context/EditContext';
import client from 'api/client';

import InputPhone from 'components/inputs/InputPhone/InputPhone';
import Button from 'components/Button/Button';

import styles from './SendVerification.module.scss';

const SendVerification = ({
  cleanPhoneNumber,
  setCleanPhoneNumber,
  setPhoneNumber,
  setVerificationBody,
}) => {
  const { mobilePhoneNo } = useContext(UserContext);
  const { setStep } = useContext(EditContext);

  const { t } = useTranslation();

  const sendVerification = () => {
    const sendData = async () => {
      const formattedPhoneNumber = `${t(
        'global.countryCode'
      )}${cleanPhoneNumber}`;
      const postBody = {
        MobilePhoneNo: formattedPhoneNumber,
      };
      const response = await client.post(
        'user/mobilephone/verifyInit',
        postBody
      );
      if (response?.status === 200) {
        setVerificationBody(response.data);
      }
      return response?.data;
    };
    if (cleanPhoneNumber?.length === 9) {
      sendData();
      setStep(2);
    }
  };

  const hasPhoneNumber = mobilePhoneNo !== undefined;

  return (
    <div>
      <p className={styles.paragraph}>
        {hasPhoneNumber
          ? t('profilePage.personalInfo.editText')
          : t('profilePage.personalInfo.addText')}
      </p>
      <InputPhone
        setPhoneData={(data) => {
          const phoneNumber = `${t('global.countryCode')} (0) ${data.slice(
            0,
            3
          )} ${data.slice(3, 6)} ${data.slice(6, 9)} ${data.slice(9, 12)}`;
          setPhoneNumber(phoneNumber);
          setCleanPhoneNumber(data);
        }}
        setCleanPhoneNumber={setCleanPhoneNumber}
      />
      <Button onClick={sendVerification}>
        {t('profilePage.personalInfo.verifyButton')}
      </Button>
    </div>
  );
};

SendVerification.propTypes = {
  cleanPhoneNumber: string,
  setCleanPhoneNumber: func,
  setPhoneNumber: func,
  setVerificationBody: func,
};

SendVerification.defaultProps = {
  cleanPhoneNumber: '',
  setCleanPhoneNumber: () => {},
  setPhoneNumber: () => {},
  setVerificationBody: () => {},
};

export default SendVerification;
