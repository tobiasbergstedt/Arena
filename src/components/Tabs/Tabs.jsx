import { number, func, node, string } from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

import styles from './Tabs.module.scss';

const Tabs = ({
  isSelected,
  setIsSelected,
  tab1,
  tab2,
  tabLabel1,
  tabLabel2,
}) => {
  const animVariantsOne = {
    initial: { x: '-100vw' },
    visible: {
      x: '0vw',
      transition: { duration: 1 },
    },
    after: { x: '-100vw', transition: { duration: 1 } },
  };

  const animVariantsTwo = {
    initial: { x: '100vw' },
    visible: {
      x: '0vw',
      transition: { duration: 1 },
    },
    after: { x: '100vw', transition: { duration: 1 } },
  };

  return (
    <>
      <div className={styles.marketSelector}>
        <p
          className={clsx(styles.selector, {
            ['goldenText']: isSelected === 0,
            [styles.isSelected]: isSelected === 0,
          })}
          onClick={() => setIsSelected(0)}
        >
          {tabLabel1}
        </p>
        <p
          className={clsx(styles.selector, {
            ['goldenText']: isSelected === 1,
            [styles.isSelected]: isSelected === 1,
          })}
          onClick={() => setIsSelected(1)}
        >
          {tabLabel2}
        </p>
      </div>
      <div className={styles.inputsWrapper}>
        <AnimatePresence initial={false}>
          {isSelected === 0 ? (
            <motion.div
              key="optionOneWrapper"
              variants={animVariantsOne}
              initial="initial"
              animate="visible"
              exit="after"
              className={styles.optionWrapper}
            >
              {tab1}
            </motion.div>
          ) : (
            <motion.div
              key="optionTwoWrapper"
              variants={animVariantsTwo}
              initial="initial"
              animate="visible"
              exit="after"
              className={styles.optionWrapper}
            >
              {tab2}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

Tabs.propTypes = {
  isSelected: number,
  setIsSelected: func,
  tab1: node,
  tab2: node,
  tabLabel1: string,
  tabLabel2: string,
};

Tabs.defaultProps = {
  isSelected: 0,
  setIsSelected: () => {},
  tab1: null,
  tab2: null,
  tabLabel1: '',
  tabLabel2: '',
};

export default Tabs;
