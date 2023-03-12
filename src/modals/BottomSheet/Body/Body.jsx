import { node } from 'prop-types';

import styles from './Body.module.scss';

const Body = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

Body.propTypes = {
  children: node,
};

Body.defaultProps = {
  children: null,
};

export default Body;
