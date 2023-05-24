import { useTranslation } from 'react-i18next';
import { array, func } from 'prop-types';

import ItemHeadings from 'components/ItemHeadings/ItemHeadings';
import PlayerTemplate from 'components/PlayerTemplate/PlayerTemplate';

import styles from './PlayersResult.module.scss';

const PlayersResult = ({ searchResultPlayer, setSearchResultPlayer }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={styles.headings}>
        <ItemHeadings
          heading={t('marketplace.heading')}
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
          {t('marketplace.resultDescriptionPlayers')}
        </p>
        <p className={styles.amountDisplayed}>
          (Displaying 1-
          {searchResultPlayer?.length <= 9 ? searchResultPlayer.length : '10'})
        </p>
      </div>
      {searchResultPlayer.map(
        ({
          playerId,
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
            key={playerId}
            isTransferList
            id={playerId}
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
            endDate={new Date(endDate).toLocaleString(t('global.localeString'))}
            cityOfOrigin={cityOfOrigin}
            attributes={attributes}
          />
        )
      )}
    </>
  );
};

PlayersResult.propTypes = {
  searchResultPlayer: array,
  setSearchResultPlayer: func,
};

export default PlayersResult;
