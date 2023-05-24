import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import fixUrl from 'utils/fix-url';

// import Page from 'components/Page/Page';
// import Spinner from 'components/Spinner/Spinner';
import ItemHeadings from 'components/ItemHeadings/ItemHeadings';
import Player from './Player/Player';
import Artefact from './Artefact/Artefact';
import ArtefactsResult from './Artefact/ArtefactsResult';
import PlayersResult from './Player/PlayersResult';

import styles from './Marketplace.module.scss';

const Marketplace = () => {
  const [searchInputPlayer, setSearchInputPlayer] = useState({
    race: '',
    position: '',
    minInjury: '',
    maxInjury: '',
    minSalary: '',
    maxSalary: '',
    minBid: '',
    maxBid: '',
  });
  const [searchInputArtefact, setSearchInputArtefact] = useState({
    artefactType: '',
    minBid: '',
    maxBid: '',
  });
  const [isSelected, setIsSelected] = useState(0);
  const [searchResultPlayer, setSearchResultPlayer] = useState([]);
  const [searchResultArtefact, setSearchResultArtefact] = useState([]);

  const { t } = useTranslation();

  async function getSearchResultPlayers() {
    let queryParams = '';
    if (
      searchInputPlayer.race.length !== 0 &&
      searchInputPlayer.race !== t('marketplace.races.any')
    ) {
      queryParams += `&race=${searchInputPlayer.race}`;
    }
    if (
      searchInputPlayer.position.length !== 0 &&
      searchInputPlayer.position !== t('positions.any')
    ) {
      queryParams += `&position=${searchInputPlayer.position}`;
    }
    if (searchInputPlayer.minInjury.length !== 0) {
      queryParams += `&minInjury=${searchInputPlayer.minInjury}`;
    }
    if (searchInputPlayer.maxInjury.length !== 0) {
      queryParams += `&maxInjury=${searchInputPlayer.maxInjury}`;
    }
    if (searchInputPlayer.minSalary.length !== 0) {
      queryParams += `&minSalary=${searchInputPlayer.minSalary}`;
    }
    if (searchInputPlayer.maxSalary.length !== 0) {
      queryParams += `&maxSalary=${searchInputPlayer.maxSalary}`;
    }
    if (searchInputPlayer.minBid.length !== 0) {
      queryParams += `&minBid=${Number(searchInputPlayer.minBid)}`;
    }
    if (searchInputPlayer.maxBid.length !== 0) {
      queryParams += `&maxBid=${Number(searchInputPlayer.maxBid)}`;
    }
    const url = `/transferlist?${queryParams.slice(1)}`;

    const response = await fetch(fixUrl(url));
    const apiData = await response.json();
    setSearchResultPlayer(apiData);
  }

  async function getSearchResultArtefacts() {
    let queryParams = '';
    if (
      searchInputArtefact.artefactType.length !== 0 &&
      searchInputArtefact.artefactType !== t('artefacts.short.any')
    ) {
      queryParams += `&artefactType=${searchInputArtefact.artefactType}`;
    }
    if (searchInputArtefact.minBid.length !== 0) {
      queryParams += `&minBid=${Number(searchInputArtefact.minBid)}`;
    }
    if (searchInputArtefact.maxBid.length !== 0) {
      queryParams += `&maxBid=${Number(searchInputArtefact.maxBid)}`;
    }
    const url = `/transferlist/artefacts?${queryParams.slice(1)}`;

    const response = await fetch(fixUrl(url));
    const apiData = await response.json();
    setSearchResultArtefact(apiData);
  }

  const handleKeyPress = (e) => {
    if (e.key == 'Enter' || e.keyCode === 13) {
      if (isSelected === 0) {
        getSearchResultPlayers();
      }
      if (isSelected === 1) {
        getSearchResultArtefacts();
      }
    }
  };

  return (
    <>
      {searchResultPlayer?.length > 0 || searchResultArtefact?.length > 0 ? (
        <>
          {isSelected === 0 ? (
            <PlayersResult
              searchResultPlayer={searchResultPlayer}
              setSearchResultPlayer={setSearchResultPlayer}
            />
          ) : (
            <ArtefactsResult
              setSearchResultArtefact={setSearchResultArtefact}
              searchResultArtefact={searchResultArtefact}
              getSearchResultArtefacts={getSearchResultArtefacts}
            />
          )}
        </>
      ) : (
        <>
          <div className={styles.headings}>
            <ItemHeadings
              heading={t('marketplace.heading')}
              subHeading={t('marketplace.subHeading')}
            />
          </div>
          <p className={styles.description}>{t('marketplace.description')}</p>
          <div className={styles.marketSelector}>
            <p
              className={clsx(styles.selector, {
                ['goldenText']: isSelected === 0,
                [styles.isSelected]: isSelected === 0,
              })}
              onClick={() => setIsSelected(0)}
            >
              {t('marketplace.players')}
            </p>
            <p
              className={clsx(styles.selector, {
                ['goldenText']: isSelected === 1,
                [styles.isSelected]: isSelected === 1,
              })}
              onClick={() => setIsSelected(1)}
            >
              {t('marketplace.artefacts')}
            </p>
          </div>
          <div className={styles.inputsWrapper}>
            <AnimatePresence initial={false}>
              {isSelected === 0 ? (
                <Player
                  setSearchInputPlayer={setSearchInputPlayer}
                  searchInputPlayer={searchInputPlayer}
                  handleKeyPress={handleKeyPress}
                  key="playersOptionsWrapper"
                  getSearchResultPlayers={getSearchResultPlayers}
                />
              ) : (
                <Artefact
                  setSearchInputArtefact={setSearchInputArtefact}
                  searchInputArtefact={searchInputArtefact}
                  handleKeyPress={handleKeyPress}
                  key="artefactsOptionsWrapper"
                  getSearchResultArtefacts={getSearchResultArtefacts}
                />
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </>
  );
};

export default Marketplace;
