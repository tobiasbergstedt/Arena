import Page from 'components/Page/Page';

import styles from './Overview.module.scss';

import BottomSheet from 'modals/BottomSheet/BottomSheet';
import { useRef } from 'react';
import Button from 'components/Button/Button';
import TestBody from './TestBody/TestBody';
import ScrollContainer from 'modals/BottomSheet/ScrollContainer/ScrollContainer';
import Header from 'modals/BottomSheet/Header/Header';
import Body from 'modals/BottomSheet/Body/Body';
import Footer from 'modals/BottomSheet/Footer/Footer';
import Portal from 'modals/Portal/Portal';

const Overview = () => {
  const bottomModalRef = useRef();

  return (
    <Page className={styles.wrapper}>
      <Button
        className={styles.btn}
        onClick={() => {
          bottomModalRef.current.expand((window.innerHeight + 33) / 2);
        }}
      >
        Open small
      </Button>
      <Button
        className={styles.btn}
        onClick={() => {
          bottomModalRef.current.expand(33);
        }}
      >
        Open max
      </Button>
      <Portal wrapperId="bottom-sheet-root">
        <BottomSheet ref={bottomModalRef}>
          <ScrollContainer>
            <Header
              label={'Header'}
              onCloseClick={() => {
                bottomModalRef.current.close();
              }}
            />
            <Body>
              <TestBody />
            </Body>
          </ScrollContainer>
          <Footer>
            <h5>Footer</h5>
          </Footer>
        </BottomSheet>
      </Portal>
    </Page>
  );
};

export default Overview;
