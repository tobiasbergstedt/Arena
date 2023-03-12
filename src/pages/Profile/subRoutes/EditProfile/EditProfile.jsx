import { useContext } from 'react';
import { UserContext } from 'context/UserContext';
import { AnimatePresence } from 'framer-motion';
import { t } from 'i18next';
import { Route, Routes, useLocation } from 'react-router-dom';

import SubPage from 'components/SubPage/SubPage';
import EditName from './EditName/EditName';
import SwapProfileImage from './SwapProfileImage/SwapProfileImage';
import ListItem from 'components/ListItem/ListItem';

import styles from './EditProfile.module.scss';

const EditProfile = () => {
  const { userName } = useContext(UserContext);
  const location = useLocation();
  const slugs = location.pathname?.split('/') ?? [];

  return (
    <SubPage label={t('profilePage.editProfile')} slugs={slugs}>
      <div className={styles.wrapper}>
        <SwapProfileImage />
        <ListItem
          label={t('profilePage.profileInfo.usernameLabel')}
          text={userName || ''}
          className={styles.listItem}
          link="edit"
          linkText={
            userName
              ? t('profilePage.personalInfo.edit')
              : t('profilePage.personalInfo.add')
          }
        />
      </div>
      <AnimatePresence>
        <Routes location={location} key={slugs[3]}>
          <Route path="edit/*" element={<EditName />} key={slugs[3]} />
        </Routes>
      </AnimatePresence>
    </SubPage>
  );
};

export default EditProfile;
