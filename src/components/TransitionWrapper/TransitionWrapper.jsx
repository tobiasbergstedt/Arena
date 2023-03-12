import clsx from 'clsx';
import { motion } from 'framer-motion';
import { node, objectOf, shape, string } from 'prop-types';

import styles from './TransitionWrapper.module.scss';

const TransitionWrapper = ({ children, className, pageTransition }) => (
  <motion.div
    className={clsx(className, styles.wrapper)}
    initial="initial"
    animate="enter"
    exit="exit"
    variants={pageTransition}
  >
    {children}
  </motion.div>
);

TransitionWrapper.propTypes = {
  children: node,
  className: string,
  pageTransition: objectOf(shape),
};

TransitionWrapper.defaultProps = {
  children: null,
  className: null,
  pageTransition: {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: { duration: 1.5 },
    },
    exit: {
      opacity: 0,
    },
  },
};

export default TransitionWrapper;
