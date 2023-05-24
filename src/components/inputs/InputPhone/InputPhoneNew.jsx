/* eslint react/prop-types: 0 */
import { string, func } from 'prop-types';
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

// import Input from 'components/inputs/Input/Input';
import InputNew from '../Input/InputNew';

import { ReactComponent as ClearIcon } from 'assets/icons/close-cross.svg';
import { ReactComponent as FlagIcon } from 'assets/icons/sweden-flag.svg';

import styles from './InputPhone.module.scss';

const InputPhoneNew = ({ placeholder, setPhoneData, setCleanPhoneNumber }) => {
  const [inputValue, setInputValue] = useState('');
  const [hasValue, setHasValue] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [hasFocus, setHasFocus] = useState(false);
  const inputRef = useRef(null);

  const onFocus = () => setHasFocus(true);
  const onBlur = () => setHasFocus(false);

  const { t } = useTranslation();

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2)}`;
    }
    return `${phoneNumber.slice(0, 2)} ${phoneNumber.slice(
      2,
      5
    )} ${phoneNumber.slice(5, 9)}`;
  };

  const handleChange = () => {
    const formattedPhoneNumber = formatPhoneNumber(inputRef.current.value);
    setInputValue(formattedPhoneNumber);
    const noBlankSpaces = inputRef.current.value.replace(/\s/g, '');
    setPhoneData(noBlankSpaces);
  };

  const resetInput = () => {
    setInputValue('');
    setHasValue(false);
    inputRef.current.focus();
    setCleanPhoneNumber('');
  };

  const setFocus = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    setHasValue(inputRef.current.value !== '');
  }, [inputRef?.current?.value, inputValue]);

  const animationVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.55 },
    hover: { opacity: 0.78 },
    transition: { duration: 0.25 },
  };

  return (
    <div className={styles.inputWrapper}>
      <InputNew
        type="tel"
        inputRef={inputRef}
        placeholder={placeholder}
        inputValue={inputValue}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={styles.phoneInput}
        maxLength={11}
      />
      <span className={styles.inputLabelText} onClick={setFocus}>
        <FlagIcon className={styles.flagIcon} />
        {t('global.countryCode')}
      </span>
      <AnimatePresence>
        {hasValue && (
          <motion.span
            key={inputRef.current}
            variants={animationVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            exit="hidden"
          >
            <ClearIcon
              className={styles.clearButton}
              onClick={() => resetInput()}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

InputPhoneNew.propTypes = {
  setPhoneData: func,
  setCleanPhoneNumber: func,
  placeholder: string,
};

InputPhoneNew.defaultProps = {
  setPhoneData: () => {},
  setCleanPhoneNumber: () => {},
  placeholder: '',
};

export default InputPhoneNew;