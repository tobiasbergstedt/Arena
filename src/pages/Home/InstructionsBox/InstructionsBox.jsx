import { memo, useEffect, useRef, useState } from 'react';
import { object, bool, func } from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import useWindowFocus from 'hooks/useWindowFocus';

import { ReactComponent as InfoIcon } from 'assets/icons/info-progress.svg';

import styles from './InstructionsBox.module.scss';

const InstructionsBox = ({ onClick }) => {
  const isFirstRender = useRef(true);
  const timeoutRef = useRef(null);

  const windowFocus = useWindowFocus();

  const texts = [
    'Zooma och panorera',
    ' Klicka för att placera din pin',
    'Eller sök efter en plats',
  ];
  const [count, setCount] = useState(0);
  const [text, setText] = useState(texts[0]);

  const startLoopAnim = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setCount((prevCount) => {
        return (prevCount + 1) % texts.length;
      });
      startLoopAnim();
    }, 2000);
  };

  useEffect(() => {
    if (!isFirstRender.current) {
      startLoopAnim();
    }
    isFirstRender.current = false;

    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (windowFocus) {
      startLoopAnim();
    } else {
      window.clearTimeout(timeoutRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowFocus]);

  useEffect(() => {
    setText(texts[count]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const animBtn = {
    large: { scale: 1 },
    small: { scale: 0.95 },
    transition: { duration: 0.15 },
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.wrapper}
        layout
        key="instructions-box"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.box}>
          <InfoIcon className={styles.infoIcon} />
          <div className={styles.textContainer}>
            <AnimatePresence>
              <motion.div
                className={styles.labelWrapper}
                key={`text${count}`}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <span className={styles.label}>{text}</span>
              </motion.div>
            </AnimatePresence>
          </div>
          <motion.button
            className={styles.button}
            type="button"
            variants={animBtn}
            initial="large"
            whileTap="small"
            transition={animBtn.transition}
            exit="large"
            onClick={onClick}
          >
            OK
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

InstructionsBox.propTypes = {
  onClick: func,
};

InstructionsBox.defaultProps = {
  onClick: () => {},
};

export default memo(InstructionsBox);
