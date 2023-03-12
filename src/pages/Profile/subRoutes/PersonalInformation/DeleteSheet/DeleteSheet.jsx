import { func, bool } from 'prop-types';
import { forwardRef, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// import client from 'api/client';

import { UserContext } from 'context/UserContext';

import Portal from 'modals/Portal/Portal';
import BottomAlert from 'modals/BottomAlert/BottomAlert';

const DeleteSheet = forwardRef(({ isModalVisible, setIsModalVisible }, ref) => {
  const { logoutUser, userBalance } = useContext(UserContext);

  // Using while waiting for activePins functionality
  const hasActivePins = true;

  const { t } = useTranslation();
  const navigate = useNavigate();

  // const deleteUser = async () => {
  //   const response = await client.delete('user/deleteuser');
  //   if (response?.status === 200) {
  //     navigate('/');
  //     logoutUser();
  //   }
  //   return response?.data;
  // };

  const onDeleteAccount = () => {
    // deleteUser();
    setIsModalVisible(false);
    setTimeout(() => {
      logoutUser();
      navigate('/');
    }, 400);
  };

  return (
    <Portal wrapperId="bottom-sheet-root">
      {userBalance === 0 && (
        <BottomAlert
          ref={ref}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onConfirm={onDeleteAccount}
          heading={t('profilePage.personalInfo.deleteHeading')}
          firstParagraph={t('profilePage.personalInfo.deleteText')}
          secondParagraph={t('profilePage.personalInfo.deleteTextWarning')}
          cancelButtonText={t('profilePage.personalInfo.cancel')}
          acceptButtonText={t('profilePage.personalInfo.confirm')}
        />
      )}
      {userBalance !== 0 && (
        <BottomAlert
          ref={ref}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          heading="Hmm..."
          firstParagraph={
            (hasActivePins
              ? t('profilePage.personalInfo.activePinsText')
              : t('profilePage.personalInfo.creditsInWalletText')) +
            t('profilePage.personalInfo.makeSureText')
          }
          cancelButtonText={t('profilePage.personalInfo.close')}
          hasOnlyOneButton
        />
      )}
    </Portal>
  );
});

DeleteSheet.propTypes = {
  isModalVisible: bool,
  setIsModalVisible: func,
};

DeleteSheet.defaultProps = {
  isModalVisible: false,
  setIsModalVisible: () => {},
};

export default DeleteSheet;
