import { func, string, shape, bool, number } from 'prop-types';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import styles from './InputNew.module.scss';

const InputNew = ({
  className,
  type,
  inputRef,
  inputValue,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  hasErrors,
  maxLength,
  placeholder,
}) => {
  const animVariants = {
    focus: {
      outline: 'none',
      borderBottom: '2px solid var(--color-gold)',
      backgroundColor: 'var(--color-grey-1)',
    },
    error: {
      outline: 'none',
      borderBottom: '2px solid rgba(var(--rgb-validation-red), 1)',
      backgroundColor: 'var(--color-validation-background-red)',
    },
    default: {
      outline: 'none',
      borderBottom: '2px solid rgba(243, 243, 243, 100%)',
      backgroundColor: 'var(--color-grey-1)',
    },
    transition: { duration: 0.05, ease: 'linear' },
  };

  const animState = () => {
    const hasFocus = document.activeElement === inputRef.current;
    // Focus, no errors
    if (hasFocus) return 'focus';
    // Errors
    if (hasErrors) return 'error';
    // No focus, no errors
    if (!hasFocus && !hasErrors) return 'default';
  };

  return (
    <motion.input
      className={clsx(styles.input, className)}
      ref={inputRef}
      initial="default"
      variants={animVariants}
      animate={animState}
      whileHover={animVariants.focus}
      transition={animVariants.transition}
      type={type}
      value={inputValue}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      maxLength={maxLength}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
    />
  );
};

InputNew.propTypes = {
  className: string,
  type: string,
  inputRef: shape(),
  inputValue: string,
  onChange: func,
  onFocus: func,
  onBlur: func,
  onKeyDown: func,
  hasErrors: bool,
  maxLength: number,
  placeholder: string,
};

InputNew.defaultProps = {
  className: null,
  type: 'text',
  inputRef: null,
  inputValue: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onKeyDown: () => {},
  hasErrors: false,
  maxLength: 1000,
  placeholder: '',
};

export default InputNew;
