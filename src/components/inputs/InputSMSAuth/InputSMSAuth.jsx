import clsx from 'clsx';
import React, { useEffect, useState, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { func, string } from 'prop-types';
import AuthCode from 'react-auth-code-input';

import { UserContext } from 'context/UserContext';

import client from 'api/client';

import styles from './InputSMSAuth.module.scss';

const InputSMSAuth = ({
  setStep,
  setIsVerified,
  formattedPhoneNumber,
  verificationBody,
}) => {
  const { setMobilePhoneNo } = useContext(UserContext);
  const [result, setResult] = useState();
  const [hasErrors, setHasErrors] = useState(false);

  const authCodeLength = 4;

  const handleOnChange = (res) => {
    setResult(res);
  };

  const validate = () => {
    const sendData = async () => {
      const postBody = {
        verificationId: verificationBody?.verificationId,
        token: result,
      };
      console.log(postBody);
      const response = await client.post('user/mobilephone/verify', postBody);
      if (response?.status === 200) {
        setIsVerified(true);
        setMobilePhoneNo(formattedPhoneNumber);
        setStep(3);
      } else {
        setIsVerified(false);
        setHasErrors(true);
      }
      return response?.data;
    };
    sendData();
  };

  useEffect(() => {
    if (result?.length === authCodeLength) {
      validate();
    } else {
      setHasErrors(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const animVariants = {
    hidden: { opacity: 0, height: 0, margin: 0 },
    visible: { opacity: 1, height: 'auto', margin: '12px' },
    transition: { duration: 0.25, ease: 'easeOut' },
  };

  return (
    <>
      <AuthCode
        length={authCodeLength}
        allowedCharacters="numeric"
        onChange={handleOnChange}
        placeholder="&#xff3f;"
        containerClassName={styles.inputWrapper}
        inputClassName={clsx(styles.authInput, {
          [styles.hasError]: hasErrors,
        })}
      />
      <AnimatePresence>
        {hasErrors && (
          <motion.span
            key="errorMessage"
            variants={animVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={animVariants.transition}
            className={styles.errorMessage}
          >
            Koden är fel.
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );
};

InputSMSAuth.propTypes = {
  setStep: func,
  setIsVerified: func,
  formattedPhoneNumber: string,
  verificationBody: func,
};

InputSMSAuth.defaultProps = {
  setStep: () => {},
  setIsVerified: () => {},
  formattedPhoneNumber: '',
  verificationBody: () => {},
};

export default InputSMSAuth;
