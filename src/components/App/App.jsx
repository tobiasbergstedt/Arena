import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AppProvider } from 'context/AppContext';
import { ModalProvider } from 'context/ModalContext';
import { UserProvider } from 'context/UserContext';
import { EditProvider } from 'context/EditContext';
import { queryConfig } from 'config/queryConfig';

import { HomeProvider } from 'context/HomeContext';

import CookieBanner from 'components/CookieBanner/CookieBanner';
import ModalSwitch from 'modals/ModalSwitch/ModalSwitch';
// import Menu from 'components/Menu/Menu';
import RouteChangeTracker from './RouteChangeTracker';
import SpinnerGlobe from 'components/SpinnerGlobe/SpinnerGlobe';
import UserNotifications from 'components/UserNotifications/UserNotifications';

const Locations = React.lazy(() => import('pages/Locations/Locations'));
const Home = React.lazy(() => import('pages/Home/Home'));
const Beneficiary = React.lazy(() => import('pages/Beneficiary/Beneficiary'));
const Overview = React.lazy(() => import('pages/Overview/Overview'));
const Profile = React.lazy(() => import('pages/Profile/Profile'));
const Dev = React.lazy(() => import('pages/Dev/Dev'));

import styles from './App.module.scss';
import Login from 'pages/Login/Login';
import Landing from 'pages/Landing/Landing';

const queryClient = new QueryClient(queryConfig);

const App = () => {
  const location = useLocation();
  const slugs = location.pathname?.split('/') ?? [];

  useEffect(() => {
    // Load user and tickets.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <UserProvider>
            <ModalProvider>
              <EditProvider>
                <div className={styles.wrapper}>
                  <AnimatePresence>
                    <Suspense
                      fallback={<SpinnerGlobe className={styles.spinner} />}
                    >
                      <AnimatePresence>
                        <Routes location={location} key={slugs[1]}>
                          <Route path="/locations" element={<Locations />} />
                          <Route path="/overview" element={<Overview />} />
                          <Route
                            path="/"
                            element={
                              <HomeProvider>
                                {false ? <Home /> : <Login />}
                              </HomeProvider>
                            }
                          />
                          <Route
                            path="/map"
                            element={<Navigate replace to="/" />}
                          />
                          <Route
                            path="/beneficiary"
                            element={<Beneficiary />}
                          />
                          <Route path="profile/*" element={<Profile />} />
                          <Route path="/landing" element={<Landing />} />
                          <Route path="dev/*" element={<Dev />} />
                        </Routes>
                      </AnimatePresence>
                    </Suspense>
                  </AnimatePresence>
                  {/* <Menu /> */}
                </div>

                <CookieBanner />
                <UserNotifications />
                <ModalSwitch />
              </EditProvider>
            </ModalProvider>
          </UserProvider>
        </AppProvider>
      </QueryClientProvider>
      <RouteChangeTracker />
    </>
  );
};

export default App;
