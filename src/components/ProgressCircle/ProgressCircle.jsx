import React, { useEffect } from 'react';
import { string, number } from 'prop-types';
import clsx from 'clsx';
import { useMotionValue, animate, motion } from 'framer-motion';

import styles from './ProgressCircle.module.scss';

const ProgressCircle = ({ className, radius, stroke, progress }) => {
  const toProgress = useMotionValue(0);
  const strokeDashoffset = useMotionValue(50);

  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  useEffect(() => {
    if (progress) {
      animate(toProgress, progress, {
        duration: 1,
        onUpdate: (value) => {
          strokeDashoffset.set(circumference - (value / 100) * circumference);
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  return (
    <div className={clsx(className, styles.wrapper)}>
      <svg height={radius * 2} width={radius * 2}>
        <motion.circle
          className={styles.circle}
          stroke="white"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
    </div>
  );
};

ProgressCircle.propTypes = {
  className: string,
  radius: number,
  stroke: number,
  progress: number,
};

ProgressCircle.defaultProps = {
  className: null,
  radius: 30,
  stroke: 4,
  progress: 30,
};

export default ProgressCircle;
