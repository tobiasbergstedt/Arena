import { useContext, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserContext } from 'context/UserContext';

import SubPage from 'components/SubPage/SubPage';
import EditPhoneNumber from './EditPhoneNumber/EditPhoneNumber';
import ListItem from 'components/ListItem/ListItem';

import styles from './PersonalInformation.module.scss';
import Button from 'components/Button/Button';
import DeleteSheet from './DeleteSheet/DeleteSheet';

const PersonalInformation = () => {
  const { mobilePhoneNo, firstName, lastName } = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const location = useLocation();

  const deleteModalRef = useRef();

  const { t } = useTranslation();

  const slugs = location.pathname?.split('/') ?? [];

  const phoneNumber =
    mobilePhoneNo?.length === 12
      ? `${mobilePhoneNo.slice(0, 3)} (0) ${mobilePhoneNo.slice(
          3,
          6
        )} ${mobilePhoneNo.slice(6, 9)} ${mobilePhoneNo.slice(9, 12)}`
      : null;

  return (
    <SubPage label={t('profilePage.personalInfo.label')} slugs={slugs}>
      <div className={styles.wrapper}>
        <ListItem
          label={t('profilePage.personalInfo.name')}
          text={
            firstName !== null && lastName !== null
              ? `${firstName} ${lastName}`
              : ''
          }
        />
        <ListItem
          link="edit"
          linkText={
            phoneNumber
              ? t('profilePage.personalInfo.edit')
              : t('profilePage.personalInfo.add')
          }
          hasNoValue={phoneNumber ? false : true}
          label={t('profilePage.personalInfo.mobilePhone')}
          text={phoneNumber || t('profilePage.personalInfo.mobilePhone')}
        />
        <div className={styles.deleteAccount}>
          <Button isText isRedText onClick={() => setIsModalVisible(true)}>
            {t('profilePage.personalInfo.deleteAccount')}
          </Button>
        </div>
        <DeleteSheet
          ref={deleteModalRef}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
        />
      </div>
      <AnimatePresence>
        <Routes location={location} key={slugs[3]}>
          <Route path="edit/*" element={<EditPhoneNumber />} key={slugs[3]} />
        </Routes>
      </AnimatePresence>
    </SubPage>
  );
};

export default PersonalInformation;
