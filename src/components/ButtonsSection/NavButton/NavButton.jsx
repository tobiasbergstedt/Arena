import { bool, func, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { renderIcon, USER_INFO } from './renderIcon';

import { ReactComponent as ChevronRight } from 'assets/icons/arrows/chevron-right.svg';
import { ReactComponent as WarningIcon } from 'assets/icons/icon-warning.svg';

import styles from './NavButton.module.scss';

const NavButton = ({ href, iconType, label, hasWarning, onClick }) => {
  const MotionLink = motion(Link);

  const iconAnimation = { hover: { color: 'var(--color-blue)' } };
  const chevronAnimation = {
    hover: { color: 'var(--color-grey-1)' },
  };

  return (
    <MotionLink
      whileHover="hover"
      className={styles.button}
      to={href}
      onClick={onClick}
    >
      {iconType && (
        <motion.div variants={iconAnimation} className={styles.iconWrapper}>
          {renderIcon(iconType, styles.icon)}
        </motion.div>
      )}
      <span className={styles.label}>{label}</span>
      {hasWarning && <WarningIcon className={styles.warningIcon} />}
      <motion.div
        variants={chevronAnimation}
        className={styles.arrowIconWrapper}
      >
        <ChevronRight className={styles.arrowIcon} />
      </motion.div>
    </MotionLink>
  );
};

NavButton.propTypes = {
  href: string,
  iconType: string,
  label: string.isRequired,
  onClick: func,
  hasWarning: bool,
};

NavButton.defaultProps = {
  href: null,
  iconType: USER_INFO,
  hasWarning: false,
  onClick: () => {},
};

export default NavButton;
