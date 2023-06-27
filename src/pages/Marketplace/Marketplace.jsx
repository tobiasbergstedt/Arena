import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import fixUrl from 'utils/fix-url';

// import Page from 'components/Page/Page';
// import Spinner from 'components/Spinner/Spinner';
import ItemHeadings from 'components/ItemHeadings/ItemHeadings';
import Player from './Player/Player';
import Artefact from './Artefact/Artefact';
import ArtefactsResult from './Artefact/ArtefactsResult';
import PlayersResult from './Player/PlayersResult';

import styles from './Marketplace.module.scss';
import Spinner from 'components/Spinner/Spinner';
import Tabs from 'components/Tabs/Tabs';

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
  const [isLoading, setIsLoading] = useState(0);
  const [searchResultPlayer, setSearchResultPlayer] = useState([]);
  const [searchResultArtefact, setSearchResultArtefact] = useState([]);

  const { t } = useTranslation();

  async function getSearchResultPlayers() {
    setIsLoading(true);
    let queryParams = [];
    const {
      race,
      position,
      minInjury,
      maxInjury,
      minSalary,
      maxSalary,
      minBid,
      maxBid,
    } = searchInputPlayer;

    if (race.length !== 0 && race !== t('marketplace.races.any')) {
      queryParams.push(`race=${race}`);
    }
    if (position.length !== 0 && position !== t('positions.any')) {
      queryParams.push(`position=${position}`);
    }
    if (minInjury.length !== 0) {
      queryParams.push(`minInjury=${minInjury}`);
    }
    if (maxInjury.length !== 0) {
      queryParams.push(`maxInjury=${maxInjury}`);
    }
    if (minSalary.length !== 0) {
      queryParams.push(`minSalary=${minSalary}`);
    }
    if (maxSalary.length !== 0) {
      queryParams.push(`maxSalary=${maxSalary}`);
    }
    if (minBid.length !== 0) {
      queryParams.push(`minBid=${Number(minBid)}`);
    }
    if (maxBid.length !== 0) {
      queryParams.push(`maxBid=${Number(maxBid)}`);
    }

    const url = `/transferlist?${queryParams.join('&')}`;

    const response = await fetch(fixUrl(url));
    const apiData = await response.json();
    await setSearchResultPlayer(apiData);
    setIsLoading(false);
  }

  async function getSearchResultArtefacts() {
    setIsLoading(true);
    const queryParams = [];
    const { artefactType, minBid, maxBid } = searchInputArtefact;

    if (
      artefactType.length !== 0 &&
      artefactType !== t('artefacts.short.any')
    ) {
      queryParams.push(`artefactType=${artefactType}`);
    }
    if (minBid.length !== 0) {
      queryParams.push(`minBid=${Number(minBid)}`);
    }
    if (maxBid.length !== 0) {
      queryParams.push(`maxBid=${Number(maxBid)}`);
    }

    const url = `/transferlist/artefacts?${queryParams.join('&')}`;

    const response = await fetch(fixUrl(url));
    const apiData = await response.json();
    await setSearchResultArtefact(apiData);
    setIsLoading(false);
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
      {isLoading ? (
        <div className={styles.isLoading}>
          <h4 className={styles.loadingText}>
            {t('marketplace.searching')}...
          </h4>
          <Spinner />
        </div>
      ) : (
        <>
          {searchResultPlayer?.length > 0 ||
          searchResultArtefact?.length > 0 ? (
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
              <p className={styles.description}>
                {t('marketplace.description')}
              </p>
              <Tabs
                isSelected={isSelected}
                setIsSelected={setIsSelected}
                tab1={
                  <Player
                    setSearchInputPlayer={setSearchInputPlayer}
                    searchInputPlayer={searchInputPlayer}
                    handleKeyPress={handleKeyPress}
                    key="playersOptionsWrapper"
                    getSearchResultPlayers={getSearchResultPlayers}
                  />
                }
                tab2={
                  <Artefact
                    setSearchInputArtefact={setSearchInputArtefact}
                    searchInputArtefact={searchInputArtefact}
                    handleKeyPress={handleKeyPress}
                    key="artefactsOptionsWrapper"
                    getSearchResultArtefacts={getSearchResultArtefacts}
                  />
                }
                tabLabel1={t('marketplace.players')}
                tabLabel2={t('marketplace.artefacts')}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Marketplace;
