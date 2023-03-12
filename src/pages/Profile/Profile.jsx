import React, { useContext } from 'react';
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { UserContext } from 'context/UserContext';
import { EditContext } from 'context/EditContext';
import clsx from 'clsx';

import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import Page from 'components/Page/Page';

import TopProfileView from './TopProfileView/TopProfileView';
import UserMenu from './UserMenu/UserMenu';
import Wallet from './Wallet/Wallet';

import styles from './Profile.module.scss';
import routes from 'pages/Profile/profileRoutes';
import BottomAlert from 'modals/BottomAlert/BottomAlert';

const Profile = () => {
  const { isLoggedIn } = useContext(UserContext);
  const {
    isInputAlertVisible,
    setIsInputAlertVisible,
    navigationTarget,
    setStep,
  } = useContext(EditContext);
  const location = useLocation();
  const slugs = location.pathname?.split('/') ?? [];

  const navigate = useNavigate();

  const onConfirm = () => {
    setIsInputAlertVisible(false);
    setTimeout(() => {
      navigate(navigationTarget);
    }, 300);
    setTimeout(() => {
      setStep(1);
    }, 100);
  };

  const returnRoutes = () => {
    const profileRoutes = [];
    routes.map((block) => {
      if (block.needsAuthentication) {
        return block.subroutes.map((subroute) => {
          profileRoutes.push(
            <Route
              key={subroute.href}
              path={subroute.path}
              element={
                <ProtectedRoute redirectPath="/profile" isAllowed={isLoggedIn}>
                  {subroute.component}
                </ProtectedRoute>
              }
            />
          );
        });
      }
      block.subroutes.map((subroute) => {
        profileRoutes.push(
          <Route
            key={subroute.href}
            path={subroute.path}
            element={subroute.component}
          />
        );
      });
    });
    return profileRoutes;
  };

  return (
    <Page className={styles.wrapper}>
      <AnimatePresence>
        <BottomAlert
          key="bottomAlert"
          isModalVisible={isInputAlertVisible ? true : false}
          onCancel={() => setIsInputAlertVisible(false)}
          onConfirm={() => onConfirm()}
        />
      </AnimatePresence>
      <div className={styles.scrollContainer}>
        <TopProfileView />
        <div
          className={clsx(styles.content, { [styles.uninlogged]: !isLoggedIn })}
        >
          {isLoggedIn && <Wallet />}
          <UserMenu isLoggedIn={isLoggedIn} />
        </div>
      </div>

      <AnimatePresence>
        <Routes location={location} key={slugs[2]}>
          {returnRoutes()}
        </Routes>
        <Outlet key="outlet" />
      </AnimatePresence>
    </Page>
  );
};

export default Profile;
