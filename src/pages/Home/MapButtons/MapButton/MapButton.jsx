import { func, string } from 'prop-types';
import { motion } from 'framer-motion';

import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';

import styles from './MapButton.module.scss';
import { memo } from 'react';

export const SEARCH = 'search';

const MapButton = ({ onClick, icon }) => {
  const animationLabel = {
    initial: { scale: 0.9, opacity: 0 },
    default: { scale: 1, opacity: 1 },
    small: { scale: 0.9 },
    transition: { duration: 0.3 },
  };

  const renderIcon = (type, className) => {
    switch (type) {
      case SEARCH:
        return <SearchIcon className={className} />;

      default:
        return <SearchIcon className={className} />;
    }
  };

  return (
    <>
      <motion.button
        className={styles.wrapper}
        type="button"
        onClick={onClick}
        variants={animationLabel}
        initial="initial"
        animate="default"
        whileTap="small"
        transition={animationLabel.transition}
        exit="large"
      >
        {icon && renderIcon(icon, styles.icon)}
      </motion.button>
    </>
  );
};

MapButton.propTypes = {
  onClick: func,
  icon: string,
};

MapButton.defaultProps = {
  onClick: () => {},
  icon: null,
};

export default memo(MapButton);
