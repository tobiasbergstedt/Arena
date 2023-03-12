import { node } from 'prop-types';

import styles from './Footer.module.scss';

const Footer = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

Footer.propTypes = {
  children: node,
};

Footer.defaultProps = {
  children: null,
};

export default Footer;
