import { useContext, useLayoutEffect, useRef } from 'react';
import { node, string, bool } from 'prop-types';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import { ModalContext } from 'context/ModalContext';

import { ReactComponent as CloseIcon } from 'assets/icons/close-cross.svg';

import styles from './Modal.module.scss';

const noop = () => {};

const Modal = ({ children, className, hasCloseButton, canClose }) => {
  const scrollRef = useRef(null);
  const { setCurrentModal } = useContext(ModalContext);

  const onClose = () => setCurrentModal(null);

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
        onClick={canClose ? onClose : noop}
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
            onClick={canClose ? onClose : noop}
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
            <CloseIcon />
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
};

Modal.defaultProps = {
  className: null,
  hasCloseButton: true,
  canClose: true,
};

export default Modal;