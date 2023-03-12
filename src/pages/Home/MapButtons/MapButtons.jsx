import { motion } from 'framer-motion';
import { func, bool } from 'prop-types';
import MapButton, { SEARCH } from './MapButton/MapButton';

import styles from './MapButtons.module.scss';

const MapButtons = ({ visible, onSearchClick }) => {
  if (visible) {
    return (
      <motion.div layout className={styles.wrapper}>
        <MapButton icon={SEARCH} onClick={onSearchClick} />
      </motion.div>
    );
  }
  return null;
};

MapButtons.propTypes = {
  visible: bool,
  onSearchClick: func,
};

MapButtons.defaultProps = {
  visible: false,
  onSearchClick: () => {},
};

export default MapButtons;
