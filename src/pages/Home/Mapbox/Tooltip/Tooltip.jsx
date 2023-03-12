import Spinner from 'components/Spinner/Spinner';
import { AnimatePresence, motion } from 'framer-motion';
import { object, bool } from 'prop-types';
import { forwardRef, memo, useEffect, useState } from 'react';
import { stall } from 'utils/helpers';

import styles from './Tooltip.module.scss';

const Tooltip = forwardRef(({ data, isVisible }, ref) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const load = async () => {
      console.log('PlaceTooltip ', data);
      await stall(500);
      setIsLoading(false);
    };
    load();
  }, [data]);

  const animWrapper = {
    initial: { opacity: 0 },
    default: { opacity: 1 },
    transition: { duration: 0.2 },
  };

  const animContent = {
    initial: { scale: 0, x: '-50%', y: 'calc(-50% - 90px)' },
    default: { scale: 1, x: '-50%', y: 'calc(-50% - 110px)' },
    transition: { duration: 0.2 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={styles.wrapper}
          ref={ref}
          key="placeTooltip"
          variants={animWrapper}
          initial={'initial'}
          animate={'default'}
          exit={'initial'}
          transition={animWrapper.transition}
        >
          <motion.div
            className={styles.container}
            key="tooltip-content"
            variants={animContent}
            initial={'initial'}
            animate={'default'}
            exit={'initial'}
            transition={animContent.transition}
          >
            <div className={styles.arrow} />
            <div className={styles.content}>
              {isLoading ? (
                <Spinner isMedium />
              ) : (
                <>
                  <div className={styles.profile} />
                  <div className={styles.labels}>
                    <span className={styles.header}>Johanna</span>
                    <span className={styles.body}>Göteborg Sweden</span>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

Tooltip.propTypes = {
  isVisible: bool,
  data: object,
};

Tooltip.defaultProps = {
  data: null,
  isVisible: false,
};

export default memo(Tooltip);
