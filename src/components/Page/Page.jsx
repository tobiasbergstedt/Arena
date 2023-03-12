import { node, string } from 'prop-types';
import clsx from 'clsx';
import TransitionWrapper from 'components/TransitionWrapper/TransitionWrapper';

import styles from './Page.module.scss';

const Page = ({ children, className }) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      {children && children}
    </div>
  );
};

Page.propTypes = {
  children: node.isRequired,
  className: string,
};

Page.defaultProps = {
  className: null,
};

export default Page;
