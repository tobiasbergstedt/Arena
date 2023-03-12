/* eslint react/prop-types: 0 */
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import clsx from 'clsx';
import { node, string, func } from 'prop-types';
import { motion } from 'framer-motion';

import useBreakpoint, { MOBILE } from 'hooks/useBreakpoint';

import styles from './BottomSheet.module.scss';

const BottomSheet = forwardRef(
  ({ children, className, onShow, onHideComplete }, ref) => {
    const [expandedHeight, setExpandedHeight] = useState('100vh');

    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === MOBILE;

    const spring = {
      type: 'spring',
      damping: 25,
      stiffness: 240,
    };
    const springMobile = {
      type: 'spring',
      damping: 100,
      stiffness: 800,
    };

    const expand = useCallback((newHeight) => {
      const heightPX = `${newHeight}px`;
      setExpandedHeight(heightPX);

      if (newHeight !== 0) {
        onShow();
      }
    }, []);

    const close = useCallback(() => {
      expand(window.innerHeight);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => ({ expand, close }));

    return (
      <motion.div
        className={clsx(styles.modalDialog, className)}
        transition={isMobile ? springMobile : spring}
        animate={{ top: expandedHeight }}
        onAnimationComplete={() => {
          if (expandedHeight === `${window.innerHeight}px`) {
            onHideComplete();
          }
        }}
      >
        {children}
      </motion.div>
    );
  }
);

BottomSheet.propTypes = {
  children: node,
  className: string,
  onShow: func,
  onHideComplete: func,
};

BottomSheet.defaultProps = {
  children: null,
  className: null,
  onShow: () => {},
  onHideComplete: () => {},
};

export default BottomSheet;
