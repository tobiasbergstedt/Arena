import { useLayoutEffect, useRef } from 'react';
import { node, string, bool, func } from 'prop-types';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import CloseCross from 'assets/icons/close-cross.svg';

import styles from './Modal.module.scss';

const noop = () => {};

const Modal = ({ children, className, hasCloseButton, canClose, onClick }) => {
  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    disableBodyScroll(scrollRef.current);
    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  return (
    <div className={clsx(styles.wrapper, className)}>
      <motion.button
        type="button"
        className={clsx(styles.bg, {
          [styles.canClose]: canClose,
        })}
        onClick={onClick ? onClick : noop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        exit={{
          opacity: 0,
          pointerEvents: 'none',
          transition: { duration: 0.2 },
        }}
      />

      <motion.div
        className={styles.modal}
        initial={{
          zIndex: 1,
          scale: 0.9,
        }}
        animate={{
          zIndex: 2,
          scale: 1,
          transition: {
            type: 'spring',
            duration: 0.6,
            bounce: 0.3,
          },
        }}
        exit={{
          zIndex: 1,
          scale: 1,
          opacity: 0,
          transition: {
            duration: 0.2,
          },
        }}
      >
        <motion.div ref={scrollRef} className={styles.scroll}>
          {children && children}
        </motion.div>

        {hasCloseButton && (
          <motion.button
            type="button"
            className={styles.closeButton}
            onClick={onClick ? onClick : noop}
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                type: 'spring',
                duration: 0.6,
                bounce: 0.3,
                delay: 0.3,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
            }}
          >
            <div
              className={styles.icon}
              style={{
                maskImage: `url(${CloseCross})`,
                WebkitMaskImage: `url(${CloseCross})`,
              }}
            />
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

Modal.propTypes = {
  children: node.isRequired,
  className: string,
  hasCloseButton: bool,
  canClose: bool,
  onClick: func,
};

Modal.defaultProps = {
  className: null,
  hasCloseButton: true,
  canClose: true,
  onClick: () => {},
};

export default Modal;
