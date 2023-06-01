import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { UserProvider } from 'context/UserContext';

import CookieBanner from 'components/CookieBanner/CookieBanner';
import RouteChangeTracker from './RouteChangeTracker';
import Spinner from 'components/Spinner/Spinner';
import Page from 'components/Page/Page';

import Login from 'pages/Login/Login';
import Landing from 'pages/Landing/Landing';
import Squad from 'pages/Squad/Squad';
import PlayerProfile from 'pages/PlayerProfile/PlayerProfile';
import Marketplace from 'pages/Marketplace/Marketplace';
import Club from 'pages/Club/Club';
import Tactics from 'pages/Tactics/Tactics';

import styles from './App.module.scss';

const App = () => {
  const location = useLocation();
  const slugs = location.pathname?.split('/') ?? [];

  useEffect(() => {
    // Load user and tickets.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <UserProvider>
        <div className={styles.wrapper}>
          <AnimatePresence>
            <Suspense fallback={<Spinner className={styles.spinner} />}>
              <AnimatePresence mode="wait">
                <Page className={styles.pageWrapper}>
                  <Routes location={location} key={slugs[1]}>
                    <Route path="/" element={<Login />} />
                    <Route path="/map" element={<Navigate replace to="/" />} />
                    <Route path="/landing" element={<Landing />} />
                    <Route path="/squad" element={<Squad />} />
                    <Route path="/player/*" element={<PlayerProfile />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/club" element={<Club />} />
                    <Route path="/tactics" element={<Tactics />} />
                  </Routes>
                </Page>
              </AnimatePresence>
            </Suspense>
          </AnimatePresence>
        </div>
        <CookieBanner />
      </UserProvider>
      <RouteChangeTracker />
    </>
  );
};

export default App;
