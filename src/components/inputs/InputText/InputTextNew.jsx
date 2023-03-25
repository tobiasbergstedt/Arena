/* eslint react/prop-types: 0 */
import { string, object, func, number } from 'prop-types';
import {
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
  useRef,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { validate } from 'utils/validation';
import useYup from 'hooks/useYup';

import InputNew from '../Input/InputNew';

import { ReactComponent as ClearIcon } from 'assets/icons/input-clear.svg';

import styles from './InputTextNew.module.scss';

const InputTextNew = forwardRef(
  (
    { value, label, validationSchema, onChange, maxLength, infoMessage },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value || '');
    const [hasValue, setHasValue] = useState(false);
    const [hasFocus, setHasFocus] = useState(false);
    const [errors, setErrors, doValidate] = useYup(validationSchema);
    const inputRef = useRef(null);

    const onFocus = () => setHasFocus(true);
    const onBlur = () => setHasFocus(false);

    const updateValidation = async () => {
      doValidate({ input: inputRef?.current?.value });
    };

    useImperativeHandle(ref, () => ({
      updateValidation,
    }));

    const handleChange = async (event) => {
      const { value } = event.target;
      const result = await validate(validationSchema, { input: value });
      setInputValue(value);
      onChange({
        value,
        result,
      });
    };

    const resetInput = () => {
      setInputValue('');
      setHasValue(false);
      setErrors(null);
      setFocus();
    };

    const setFocus = () => {
      inputRef.current.focus();
    };

    useEffect(() => {
      setHasValue(inputRef.current.value !== '');
    }, [inputRef?.current?.value, inputValue]);

    const animClearIcon = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      hover: { opacity: 0.65 },
    };

    const animLabel = {
      large: { fontSize: '18px', margin: '20px' },
      small: { fontSize: '12px', marginTop: '8px' },
      transition: { duration: 0.35, ease: 'easeOut' },
    };

    const animError = {
      hidden: { opacity: 0, height: 0, marginBottom: 0 },
      visible: {
        opacity: 1,
        height: 'auto',
        marginBottom: infoMessage.length !== 0 ? '12px' : '0px',
      },
      transition: { duration: 0.25, ease: 'easeOut' },
    };

    return (
      <div className={styles.inputWrapper}>
        <InputNew
          type="text"
          inputRef={inputRef}
          inputValue={inputValue}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          hasErrors={errors !== null}
          maxLength={maxLength}
        />
        <AnimatePresence initial={false}>
          <motion.span
            className={styles.inputLabelText}
            key="inputLabelText"
            variants={animLabel}
            initial="large"
            animate={hasFocus || hasValue ? 'small' : 'large'}
            transition={animLabel.transition}
            exit="large"
          >
            {label}
          </motion.span>

          {hasValue && (
            <motion.span
              key="clearButton"
              variants={animClearIcon}
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

          {!errors && (
            <motion.span
              key="infoMessage"
              variants={animError}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={animError.transition}
              className={styles.infoMessage}
            >
              {infoMessage}
            </motion.span>
          )}

          {errors && (
            <motion.span
              key="errors"
              variants={animError}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={animError.transition}
              className={styles.errorMessage}
            >
              {errors.input}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

InputTextNew.propTypes = {
  value: string,
  label: string,
  validationSchema: object,
  onChange: func,
  maxLength: number,
  infoMessage: string,
};

InputTextNew.defaultProps = {
  value: '',
  label: '',
  validationSchema: null,
  onChange: () => {},
  maxLength: 1000,
  infoMessage: '',
};

export default InputTextNew;
