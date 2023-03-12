import { useContext, useEffect, useState } from 'react';
import SubPage from 'components/SubPage/SubPage';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { EditContext } from 'context/EditContext';

import SendVerification from './Verification/SendVerification';
import Verify from './Verification/Verify';
import VerifyingNumber from './Verification/VerifyingNumber';

import styles from './EditPhoneNumber.module.scss';

const EditName = () => {
  const { step, setStep } = useContext(EditContext);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [cleanPhoneNumber, setCleanPhoneNumber] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationBody, setVerificationBody] = useState(null);

  const { t } = useTranslation();

  const location = useLocation();
  const slugs = location.pathname?.split('/') ?? [];

  useEffect(() => {
    if (cleanPhoneNumber?.length > 0) {
      setFormattedPhoneNumber(t('global.countryCode') + cleanPhoneNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanPhoneNumber]);

  const animVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4, delay: 0.4 } },
    transition: { duration: 0.4, ease: 'easeOut' },
  };

  return (
    <SubPage
      label={t('profilePage.personalInfo.mobilePhone')}
      slugs={slugs}
      isValueChanged={cleanPhoneNumber !== ''}
    >
      <div className={styles.wrapper}>
        <AnimatePresence initial={false}>
          {step === 1 && (
            <motion.div
              key="sendVerificationWrapper"
              variants={animVariants}
              animate="visible"
              exit="hidden"
              transition={animVariants.transition}
            >
              <SendVerification
                setStep={setStep}
                setPhoneNumber={setPhoneNumber}
                cleanPhoneNumber={cleanPhoneNumber}
                setCleanPhoneNumber={setCleanPhoneNumber}
                setVerificationBody={() => setVerificationBody}
              />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="verifyWrapper"
              variants={animVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={animVariants.transition}
            >
              <Verify
                phoneNumber={phoneNumber}
                formattedPhoneNumber={formattedPhoneNumber}
                setStep={setStep}
                isVerified={isVerified}
                setIsVerified={setIsVerified}
                verificationBody={verificationBody}
              />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key="verifyingNumberWrapper"
              variants={animVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={animVariants.transition}
            >
              <VerifyingNumber isVerified={isVerified} setStep={setStep} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SubPage>
  );
};

export default EditName;
