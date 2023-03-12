import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { string, bool } from 'prop-types';

import { AnimatePresence, motion } from 'framer-motion';

import mapSvgUrl from 'assets/icons/map-anim.svg';

import styles from './SpinnerGlobe.module.scss';

const SpinnerGlobe = ({
  className,
  isSmall,
  isMedium,
  isLarge,
  hasNoOutline,
}) => {
  const [leftOffset, setLeftOffset] = useState(-50);

  useEffect(() => {
    if (isMedium) {
      setLeftOffset(-75);
    }

    if (isSmall) {
      setLeftOffset(-50);
    }

    if (isLarge) {
      setLeftOffset(-100);
    }
  }, [isSmall, isMedium, isLarge]);

  return (
    <AnimatePresence>
      <motion.div
        className={clsx(styles.wrapper, className, {
          [styles.isSmall]: isSmall,
          [styles.isMedium]: isMedium,
          [styles.isLarge]: isLarge,
          [styles.hasNoOutline]: hasNoOutline,
        })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.25 } }}
        exit={{ opacity: 0 }}
      >
        <div
          className={clsx(styles.circle, {
            [styles.isSmall]: isSmall,
            [styles.isMedium]: isMedium,
            [styles.isLarge]: isLarge,
          })}
        >
          <motion.div
            className={styles.mapWrapper}
            animate={{ left: leftOffset }}
            transition={{
              from: 0,
              repeatDelay: 1.5,
              duration: 1,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            <div
              className={clsx(styles.mapAnim, {
                [styles.isSmall]: isSmall,
                [styles.isMedium]: isMedium,
                [styles.isLarge]: isLarge,
              })}
              style={{ backgroundImage: `url(${mapSvgUrl})` }}
            />
            <div
              className={clsx(styles.mapAnim, {
                [styles.isSmall]: isSmall,
                [styles.isMedium]: isMedium,
                [styles.isLarge]: isLarge,
              })}
              style={{ backgroundImage: `url(${mapSvgUrl})` }}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

SpinnerGlobe.propTypes = {
  className: string,
  isSmall: bool,
  isMedium: bool,
  isLarge: bool,
  hasNoOutline: bool,
};

SpinnerGlobe.defaultProps = {
  className: null,
  isSmall: false,
  isMedium: false,
  isLarge: false,
  hasNoOutline: false,
};

export default SpinnerGlobe;
