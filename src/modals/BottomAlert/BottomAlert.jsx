import { forwardRef } from 'react';
import { bool, func, string } from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import Button from 'components/Button/Button';
import { ReactComponent as AlertIcon } from 'assets/icons/alert.svg';

import styles from './BottomAlert.module.scss';

const BottomAlert = forwardRef(
  (
    {
      isModalVisible,
      setIsModalVisible,
      acceptButtonText,
      cancelButtonText,
      heading,
      firstParagraph,
      secondParagraph,
      hasOnlyOneButton,
      onCancel,
      onConfirm,
    },
    ref
  ) => {
    const { t } = useTranslation();

    const onCancelAction = () => {
      setIsModalVisible(false);
      onCancel();
    };

    const animationVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      transition: { duration: 0.4 },
    };

    const animationInnerVariants = {
      hidden: { bottom: '-500px' },
      visible: { bottom: 0 },
      transition: { duration: 0.4 },
    };

    return (
      <AnimatePresence>
        {isModalVisible && (
          <motion.div
            className={styles.wrapper}
            key="bottomAlertWrapper"
            variants={animationVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={animationVariants.transition}
          >
            <motion.div
              ref={ref}
              className={styles.innerWrapper}
              key="bottomAlertInnerWrapper"
              variants={animationInnerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={animationInnerVariants.transition}
            >
              <div className={styles.textWrapper}>
                {hasOnlyOneButton && <AlertIcon className={styles.alertIcon} />}
                <h4
                  className={clsx(styles.heading, {
                    [styles.headingHasAlertIcon]: hasOnlyOneButton,
                  })}
                >
                  {heading || t('profilePage.personalInfo.goBackHeading')}
                </h4>
                <p>
                  {firstParagraph || t('profilePage.personalInfo.goBackText')}
                </p>
                {secondParagraph !== '' && (
                  <p className={styles.redText}>{secondParagraph}</p>
                )}
              </div>
              <div className={styles.buttonWrapper}>
                <Button
                  isSecondary
                  onClick={() => onCancelAction()}
                  className={styles.button}
                >
                  {cancelButtonText || t('profilePage.personalInfo.cancel')}
                </Button>

                {!hasOnlyOneButton && (
                  <Button onClick={() => onConfirm()} className={styles.button}>
                    {acceptButtonText || t('profilePage.personalInfo.dontSave')}
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
BottomAlert.propTypes = {
  isModalVisible: bool,
  hasOnlyOneButton: bool,
  setIsModalVisible: func,
  acceptButtonText: string,
  cancelButtonText: string,
  heading: string,
  firstParagraph: string,
  secondParagraph: string,
  onCancel: func,
  onConfirm: func,
};

BottomAlert.defaultProps = {
  isModalVisible: false,
  hasOnlyOneButton: false,
  setIsModalVisible: () => {},
  acceptButtonText: '',
  cancelButtonText: '',
  heading: '',
  firstParagraph: '',
  secondParagraph: '',
  onCancel: () => {},
  onConfirm: () => {},
};

export default BottomAlert;
