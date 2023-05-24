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
import Page from 'components/Page/Page';

import Login from 'pages/Login/Login';
import Landing from 'pages/Landing/Landing';
import Squad from 'pages/Squad/Squad';
import PlayerProfile from 'pages/PlayerProfile/PlayerProfile';
import Marketplace from 'pages/Marketplace/Marketplace';
import Club from 'pages/Club/Club';

import styles from './App.module.scss';

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
                      <AnimatePresence mode="wait">
                        <Page className={styles.pageWrapper}>
                          <Routes location={location} key={slugs[1]}>
                            <Route
                              path="/"
                              element={
                                <HomeProvider>
                                  <Login />
                                </HomeProvider>
                              }
                            />
                            <Route
                              path="/map"
                              element={<Navigate replace to="/" />}
                            />
                            <Route path="/landing" element={<Landing />} />
                            <Route path="/squad" element={<Squad />} />
                            <Route
                              path="/player/*"
                              element={<PlayerProfile />}
                            />
                            <Route
                              path="/marketplace"
                              element={<Marketplace />}
                            />
                            <Route path="/club" element={<Club />} />
                          </Routes>
                        </Page>
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
