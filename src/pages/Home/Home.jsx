import React, { Suspense, useContext, useRef, useState } from 'react';

import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';

import { UserContext } from 'context/UserContext';
import { HomeContext } from 'context/HomeContext';

import { ReactComponent as PangeoLogo } from 'assets/icons/pangeo.svg';
import Page from 'components/Page/Page';
import Button from 'components/Button/Button';
import CountDown from 'pages/Home/CountDown/CountDown';

const Mapbox = React.lazy(() => import('pages/Home/Mapbox/Mapbox'));
import { useTranslation } from 'react-i18next';
import useBreakpoint, { MOBILE } from 'hooks/useBreakpoint';

import SpinnerGlobe from 'components/SpinnerGlobe/SpinnerGlobe';
import Login from './Login/Login';
import MapButtons from './MapButtons/MapButtons';
import SearchSheet from './SearchSheet/SearchSheet';

import styles from './Home.module.scss';
import InstructionsBox from './InstructionsBox/InstructionsBox';

const Home = () => {
  const searchModalRef = useRef();
  const mapboxRef = useRef();

  const { isLoggedIn } = useContext(UserContext);
  const {
    hasSkippedInstructions,
    setHasSkippedInstructions,
    isZoomValidForSelectPlace,
  } = useContext(HomeContext);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [hasSkippedLogin, setHasSkippedLogin] = useState(false);
  const [markerIsPlaced, setMarkerIsPlaced] = useState(false);
  const [isFindPlaceBtnVisible, setIsFindPlaceBtnVisible] = useState(true);

  const [hideInstructions, setHideInstructions] = useState(false);

  const { t } = useTranslation();
  const breakpoint = useBreakpoint();

  const isMobile = breakpoint === MOBILE;
  const bankIDFileName = 'bankid';

  const isLoginButtonsVisible = () => {
    if (markerIsPlaced) return false;
    if (isLoggedIn) return false;
    if (hasSkippedLogin) return false;
    return true;
  };

  const isSelectPlaceBtnVisible = () => {
    if (markerIsPlaced) return true;
    return false;
  };

  const isInstructionsVisible = () => {
    if (
      (isLoggedIn || hasSkippedLogin) &&
      !hideInstructions &&
      !hasSkippedInstructions &&
      !markerIsPlaced
    ) {
      return true;
    }

    return false;
  };

  const LoginButtons = () => {
    if (isLoginButtonsVisible()) {
      return (
        <div className={styles.loginOverlay}>
          <>
            <Button
              isLoginPage
              className={styles.loginBtn}
              hasIcon={bankIDFileName}
              onClick={() => {
                setIsLoginVisible(true);
              }}
            >
              {t('homePage.logIn')}
            </Button>
            <Button
              isLoginPage
              isText
              onClick={() => {
                setHasSkippedLogin(true);
              }}
            >
              {t('homePage.logInLater')}
            </Button>
          </>
        </div>
      );
    }
    return null;
  };

  /*
  const MapButtonsDev = () => {
    if (isLoggedIn) {
      return (
        <div className={styles.mapButtons}>
          <MapButton
            icon={SEARCH}
            onClick={() => {
              isMobile
                ? searchModalRef.current.expand('33')
                : searchModalRef.current.expand('80');
            }}
          />
        </div>
      );
    }
    return null;
  };


  const Tutorial = () => {
    const isTutorialVisible = () => {
      return (isLoggedIn || hasSkippedLogin) && !hasSkippedInstructions;
    };

    const btnAnim = {
      initial: { opacity: 0, y: 5 },
      show: { opacity: 1, y: 0, transition: { duration: 0.15, delay: 0 } },
      exit: { opacity: 0, delay: 0.3 },
    };

    if (isTutorialVisible()) {
      return (
        <LayoutGroup>
          <motion.div layout className={styles.mapBtnAndInfoWrapper}>
            <MapButtons
              visible={isLoggedIn}
              onSearchClick={() => {
                isMobile
                  ? searchModalRef.current.expand('33')
                  : searchModalRef.current.expand('80');
              }}
            />
            <InstructionsBox
              isVisible={isInstructionsVisible()}
              onClick={() => {
                console.log('click');
              }}
            />
          </motion.div>
        </LayoutGroup>
      );
    }
    return null;
  };
  */

  const SelectPlace = ({ valid }) => {
    if (isSelectPlaceBtnVisible()) {
      return (
        <div className={styles.selectMarkerOverlay}>
          <Button isLoginPage onClick={() => {}}>
            Välj denna plats
          </Button>
          <Button
            isText
            onClick={() => {
              mapboxRef.current.clearMarker();
              setMarkerIsPlaced(false);
            }}
          >
            Tabort pin
          </Button>
          {!isZoomValidForSelectPlace && (
            <span>Zooma in för att välja plats</span>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Page className={styles.wrapper}>
      <PangeoLogo className={styles.pangeoLogo} />

      <CountDown prizeValue="12354" />

      <LoginButtons />

      <SelectPlace />

      <Login
        isLoggedIn={isLoggedIn}
        isLoginVisible={isLoginVisible}
        hasShadow
        setIsLoginVisible={setIsLoginVisible}
        onClose={() => {
          setIsLoginVisible(false);
        }}
      />

      <Suspense fallback={<SpinnerGlobe />}>
        <Mapbox
          ref={mapboxRef}
          onMarkerPlaced={(value) => {
            setMarkerIsPlaced(value);
          }}
          onMarkerSelected={() => {
            // setSelectedPlace(value);
          }}
          onInteraction={() => {
            setIsFindPlaceBtnVisible(false);
            // setSelectedPlace(null);
          }}
        />
      </Suspense>

      <SearchSheet
        ref={searchModalRef}
        onBoundsSelected={(bounds) => {
          searchModalRef.current.close();
          mapboxRef.current.moveToBounds(bounds);
        }}
      />

      <LayoutGroup>
        <motion.div layout className={styles.mapBtnAndInfoWrapper}>
          <MapButtons
            visible={isLoggedIn}
            onSearchClick={() => {
              isMobile
                ? searchModalRef.current.expand('33')
                : searchModalRef.current.expand('80');
            }}
          />
          {isInstructionsVisible() && (
            <InstructionsBox
              onClick={() => {
                setHasSkippedInstructions(true);
                setHideInstructions(true);
              }}
            />
          )}
        </motion.div>
      </LayoutGroup>

      <Button className={styles.testBtn} onClick={() => {}}>
        Test
      </Button>
    </Page>
  );
};

export default Home;
