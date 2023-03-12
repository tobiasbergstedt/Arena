import { node, string, arrayOf, bool } from 'prop-types';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import styles from './SubPage.module.scss';
import NavigationBar from './NavigationBar/NavigationBar';

const SubPage = ({ children, className, label, slugs, isValueChanged }) => {
  const style = { zIndex: slugs.length };

  return (
    <motion.div
      style={style}
      className={clsx(styles.wrapper, className)}
      initial={{ x: '100%' }}
      animate={{ x: 0, transition: { ease: 'easeOut', duration: 0.45 } }}
      exit={{
        x: '100%',
        transition: { ease: 'easeOut', duration: 0.45 },
      }}
    >
      <NavigationBar
        label={label}
        slugs={slugs}
        isValueChanged={isValueChanged}
      />
      {children && children}
    </motion.div>
  );
};

SubPage.propTypes = {
  children: node.isRequired,
  className: string,
  label: string,
  slugs: arrayOf(string),
  isValueChanged: bool,
};

SubPage.defaultProps = {
  className: null,
  label: '',
  slugs: [],
  isValueChanged: false,
};

export default SubPage;
