import { func, string, bool, array } from 'prop-types';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import styles from './Select.module.scss';
import { useRef } from 'react';

const Select = ({
  className,
  type,
  onChange,
  onFocus,
  onBlur,
  hasErrors,
  label,
  options,
  isSmall,
}) => {
  const ref = useRef();

  const animVariants = {
    focus: {
      borderBottom: '2px solid var(--color-gold)',
      backgroundColor: 'var(--color-grey-1)',
    },
    error: {
      borderBottom: '2px solid rgba(var(--rgb-validation-red), 1)',
      backgroundColor: 'var(--color-validation-background-red)',
    },
    default: {
      borderBottom: '2px solid var(--input-border)',
      backgroundColor: 'var(--color-grey-1)',
    },
    transition: { duration: 0.05, ease: 'linear' },
  };

  const animState = () => {
    const hasFocus = document.activeElement === ref.current;
    // Focus, no errors
    if (hasFocus) return 'focus';
    // Errors
    if (hasErrors) return 'error';
    // No focus, no errors
    if (!hasFocus && !hasErrors) return 'default';
  };

  return (
    <label
      className={clsx(styles.label, {
        [styles.labelIsSmall]: isSmall,
      })}
    >
      <motion.select
        className={clsx(styles.select, className, {
          [styles.isSmall]: isSmall,
        })}
        ref={ref}
        // initial="default"
        variants={isSmall ? null : animVariants}
        animate={animState}
        whileHover={isSmall ? null : animVariants.focus}
        transition={isSmall ? null : animVariants.transition}
        type={type}
        onChange={() => {
          onChange(ref.current.value);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        name={label}
        defaultValue={'default'}
      >
        <option value="default" disabled hidden>
          {label}
        </option>
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
        {/* <option value="human">Human</option>
        <option value="elves">Elves</option>
        <option value="dwarves">Dwarves</option>
        <option value="Orcs">Orcs</option> */}
      </motion.select>
    </label>
  );
};

Select.propTypes = {
  className: string,
  type: string,
  onChange: func,
  onFocus: func,
  onBlur: func,
  hasErrors: bool,
  label: string,
  options: array,
  isSmall: bool,
};

Select.defaultProps = {
  className: null,
  type: 'text',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  hasErrors: false,
  label: '',
  options: [],
  isSmall: false,
};

export default Select;
