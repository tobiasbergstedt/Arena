import { node } from 'prop-types';

import styles from './ScrollContainer.module.scss';

const ScrollContainer = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

ScrollContainer.propTypes = {
  children: node,
};

ScrollContainer.defaultProps = {
  children: null,
};

export default ScrollContainer;
