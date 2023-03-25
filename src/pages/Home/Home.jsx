import React, { Suspense } from 'react';

import Page from 'components/Page/Page';

import SpinnerGlobe from 'components/SpinnerGlobe/SpinnerGlobe';

import styles from './Home.module.scss';

const Home = () => {
  return (
    <Page className={styles.wrapper}>
      <p>Asta</p>
      <Suspense fallback={<SpinnerGlobe />}></Suspense>
    </Page>
  );
};

export default Home;
