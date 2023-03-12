import { func, string, shape, bool, number } from 'prop-types';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import styles from './Input.module.scss';

const Input = ({
  className,
  type,
  inputRef,
  inputValue,
  onChange,
  onFocus,
  onBlur,
  hasErrors,
  maxLength,
  placeholder,
}) => {
  const animVariants = {
    focus: {
      outline: '2px solid rgba(var(--rgb-blue), 1)',
      backgroundColor: 'var(--color-grey-6)',
    },
    error: {
      outline: '2px solid rgba(var(--rgb-validation-red), 1)',
      backgroundColor: 'var(--color-validation-background-red)',
    },
    default: {
      outline: '2px solid rgba(var(--rgb-blue), 0)',
      backgroundColor: 'var(--color-grey-6)',
    },
    transition: { duration: 0.35, ease: 'linear' },
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
      transition={animVariants.transition}
      type={type}
      value={inputValue}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      maxLength={maxLength}
      placeholder={placeholder}
    />
  );
};

Input.propTypes = {
  className: string,
  type: string,
  inputRef: shape(),
  inputValue: string,
  onChange: func,
  onFocus: func,
  onBlur: func,
  hasErrors: bool,
  maxLength: number,
  placeholder: string,
};

Input.defaultProps = {
  className: null,
  type: 'text',
  inputRef: null,
  inputValue: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  hasErrors: false,
  maxLength: 1000,
  placeholder: '',
};

export default Input;
