import Page from 'components/Page/Page';

import SpinnerGlobe from 'components/SpinnerGlobe/SpinnerGlobe';

import styles from './Locations.module.scss';

const Locations = () => {
  return (
    <Page className={styles.wrapper}>
      <SpinnerGlobe isMedium />
    </Page>
  );
};

export default Locations;
