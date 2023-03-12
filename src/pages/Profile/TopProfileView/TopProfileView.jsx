import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserContext } from 'context/UserContext';
import clsx from 'clsx';

import { ReactComponent as EditIcon } from 'assets/icons/edit.svg';
import { ReactComponent as GlobeIcon } from 'assets/icons/profile-icon-globe.svg';

import Button from 'components/Button/Button';
import styles from './TopProfileView.module.scss';

const TopProfileView = () => {
  const { t } = useTranslation();
  const { userId, profileImageUrl, userName } = useContext(UserContext);

  return (
    <div className={clsx(styles.wrapper, { [styles.uninlogged]: !userId })}>
      {userId ? (
        <>
          <div className={styles.image}>
            {profileImageUrl ? (
              <img src={profileImageUrl} alt="" />
            ) : (
              <GlobeIcon className={styles.globeIcon} />
            )}
          </div>
          <p className={styles.username}>{userName}</p>
          <Link to="edit-profile" className={styles.editLink}>
            <EditIcon className={styles.editIcon} />
            {t('profilePage.editProfile')}
          </Link>
        </>
      ) : (
        <>
          <GlobeIcon className={styles.globeIcon} />
          <div className={styles.buttonWrapper}>
            <Button to={'/'} isTransparent>
              {t('profilePage.logIn')}
            </Button>
            <Button to={'/'} isTransparent>
              {t('profilePage.createAccount')}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TopProfileView;
