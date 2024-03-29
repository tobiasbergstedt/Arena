import { node, oneOf, bool, func, string } from 'prop-types';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import Spinner from 'components/Spinner/Spinner';

import styles from './Button.module.scss';

const noop = () => {};

const Button = ({
  children,
  className,
  type,
  to,
  href,
  isDisabled,
  isSecondary,
  isTertiary,
  isQuaternary,
  isText,
  isRegister,
  isLoading,
  isSmall,
  hasIcon,
  onClick,
}) => {
  const classNames = clsx(styles.button, className, {
    [styles.isDisabled]: isDisabled,
    [styles.isSecondary]: isSecondary,
    [styles.isTertiary]: isTertiary,
    [styles.isQuaternary]: isQuaternary,
    [styles.isText]: isText,
    [styles.isRegister]: isRegister,
    [styles.isLoading]: isLoading,
    [styles.isSmall]: isSmall,
  });

  const animationLabel = {
    large: { scale: 1 },
    small: { scale: 0.95 },
    transition: { duration: 0.15 },
  };

  const text = () => {
    if (isLoading) {
      return <Spinner />;
    }

    return <span>{children && children}</span>;
  };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classNames}>
        {text()}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classNames}>
        {text()}
      </Link>
    );
  }

  return (
    <>
      <motion.button
        type={type === 'submit' ? 'submit' : 'button'}
        onClick={onClick}
        disabled={isDisabled}
        className={classNames}
        onTouchStart={noop} // Otherwise :active won't work.
        variants={animationLabel}
        initial="large"
        whileTap="small"
        transition={animationLabel.transition}
        exit="large"
      >
        {hasIcon && <img src={hasIcon} className={styles.hasIcon} />}
        {text()}
      </motion.button>
    </>
  );
};

Button.propTypes = {
  children: node.isRequired,
  className: string,
  type: oneOf(['button', 'submit']),
  to: string,
  href: string,
  isDisabled: bool,
  isSecondary: bool,
  isTertiary: bool,
  isQuaternary: bool,
  isText: bool,
  isRegister: bool,
  isLoading: bool,
  isSmall: bool,
  hasIcon: string,
  onClick: func,
};

Button.defaultProps = {
  className: null,
  type: 'button',
  to: null,
  href: null,
  isDisabled: false,
  isSecondary: false,
  isTertiary: false,
  isQuaternary: false,
  isText: false,
  isRegister: false,
  isLoading: false,
  isSmall: false,
  hasIcon: null,
  onClick: () => {},
};

export default Button;
