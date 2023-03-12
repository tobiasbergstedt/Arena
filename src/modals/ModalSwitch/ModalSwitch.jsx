import React, { useContext } from 'react';
import { AnimatePresence } from 'framer-motion';

import { MODAL_TEST } from 'config/constants';
import { ModalContext } from 'context/ModalContext';

import TestModal from 'modals/TestModal/TestModal';

const ModalSwitch = () => {
  const { currentModal } = useContext(ModalContext);

  const renderModal = () => {
    switch (currentModal) {
      case MODAL_TEST:
        return <TestModal key="test-modal" />;
      /*
      case MODAL_SIGN_UP:
        return <SignUpModal key="sign-up-modal" />;
      */
      default:
        return null;
    }
  };

  return <AnimatePresence>{renderModal()}</AnimatePresence>;
};

export default React.memo(ModalSwitch);
