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
  isWhiteButton,
  isBlueButton,
  isSecondaryBlueButton,
  isGhost,
  isText,
  isRedText,
  isTransparent,
  isLoading,
  isLoginPage,
  onClick,
  hasShadow,
}) => {
  const classNames = clsx(styles.button, className, {
    [styles.isDisabled]: isDisabled,
    [styles.isSecondary]: isSecondary,
    [styles.isWhiteButton]: isWhiteButton,
    [styles.isBlueButton]: isBlueButton,
    [styles.isSecondaryBlueButton]: isSecondaryBlueButton,
    [styles.isGhost]: isGhost,
    [styles.isTransparent]: isTransparent,
    [styles.isText]: isText,
    [styles.isRedText]: isRedText,
    [styles.isLoading]: isLoading,
    [styles.isLoginPage]: isLoginPage,
    [styles.hasShadow]: hasShadow,
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
  isWhiteButton: bool,
  isBlueButton: bool,
  isSecondaryBlueButton: bool,
  isGhost: bool,
  isText: bool,
  isRedText: bool,
  isTransparent: bool,
  isLoading: bool,
  isLoginPage: bool,
  hasShadow: bool,
  onClick: func,
};

Button.defaultProps = {
  className: null,
  type: 'button',
  to: null,
  href: null,
  isDisabled: false,
  isSecondary: false,
  isWhiteButton: false,
  isBlueButton: false,
  isSecondaryBlueButton: false,
  isGhost: false,
  isText: false,
  isRedText: false,
  isTransparent: false,
  isLoading: false,
  isLoginPage: false,
  hasShadow: false,
  onClick: () => {},
};

export default Button;
