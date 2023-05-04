import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import Page from 'components/Page/Page';
import Spinner from 'components/Spinner/Spinner';

import styles from './Marketplace.module.scss';
import ItemHeadings from 'components/ItemHeadings/ItemHeadings';
import Player from './Player/Player';
import Artefact from './Artefact/Artefact';
import { AnimatePresence } from 'framer-motion';
import fixUrl from 'utils/fix-url';
import PlayerTemplate from 'components/PlayerTemplate/PlayerTemplate';

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

  const handleKeyPress = (e) => {
    if (e.key == 'Enter' || e.keyCode === 13) {
      if (isSelected === 0) {
        getSearchResultPlayers();
      }
    }
  };

  console.log(searchResultPlayer && searchResultPlayer);

  return (
    <Page pageTitle={t('pageTitles.marketplace')}>
      {searchResultPlayer?.length > 0 ? (
        <>
          <div className={styles.headings}>
            <ItemHeadings
              heading={t('marketplace.subHeading')}
              subHeading={`${searchResultPlayer.length} ${
                searchResultPlayer.length > 1
                  ? t('marketplace.results')
                  : searchResultPlayer.length === 0
                  ? t('marketplace.results')
                  : t('marketplace.result')
              }`}
              hasButton={t('general.return')}
              onClick={() => setSearchResultPlayer([])}
            />
            <p className={styles.playerResultsDescription}>
              Click players to see more information about them.
            </p>
            <p className={styles.amountDisplayed}>
              (Displaying 1-
              {searchResultPlayer?.length <= 9
                ? searchResultPlayer.length
                : '10'}
              )
            </p>
          </div>
          {searchResultPlayer.map(
            ({
              id,
              name,
              position,
              number,
              artefacts,
              salary,
              matchForm,
              race,
              injuryLevel,
              cityOfOrigin,
              endDate,
              bid,
              teamName,
              attributes,
            }) => (
              <PlayerTemplate
                key={id}
                isTransferList
                id={id}
                name={name}
                position={position[0].position}
                number={number}
                artefacts={artefacts}
                salary={salary}
                matchForm={matchForm}
                race={race}
                injuryLevel={injuryLevel}
                bid={bid[0]}
                teamName={teamName}
                endDate={new Date(endDate.seconds * 1000).toLocaleString(
                  'sv-SE'
                )}
                cityOfOrigin={cityOfOrigin}
                attributes={attributes}
              />
            )
          )}
        </>
      ) : (
        <>
          <div className={styles.headings}>
            <ItemHeadings
              heading={t('marketplace.subHeading')}
              subHeading={t('marketplace.heading')}
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
                />
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </Page>
  );
};

export default Marketplace;
