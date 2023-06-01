import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';

import fixUrl from 'utils/fix-url';

import { UserContext } from 'context/UserContext';

import PlayerTemplate from 'components/PlayerTemplate/PlayerTemplate';
import RadarStats from 'components/Charts/RadarStats/RadarStats';
import Spinner from 'components/Spinner/Spinner';

import Attributes from './Attributes/Attributes';
import StatsRanking from './StatsRanking/StatsRanking';
import PersonalStatistics from './PersonalStatistics/PersonalStatistics';
import BestPositions from './BestPositions/BestPositions';
import TransferHistory from './TransferHistory/TransferHistory';

import styles from './PlayerProfile.module.scss';
import SellModal from './Modals/SellModal';
import ReleaseModal from './Modals/ReleaseModal';

const PlayerProfile = () => {
  const { t } = useTranslation();
  const { userTeam, savedAttributes } = useContext(UserContext);
  const [player, setPlayer] = useState();
  const [modalVisible, setModalVisible] = useState('NONE');
  const [attributeStates, setAttributeStates] = useState([]);
  const [statsSelectValue, setStatsSelectValue] = useState(
    t('statistics.goals')
  );
  const [attributes, setAttributes] = useState([]);
  const [today, setToday] = useState('');

  const location = useLocation();
  const slugs = location.pathname?.split('/') ?? [];

  const playerID = slugs[slugs.length - 1];
  const teamID = userTeam.id;

  const desiredAttributes = [
    'stamina',
    'speed',
    'composure',
    'creativity',
    'passing',
    'dribbling',
    'leadership',
  ];

  useEffect(() => {
    function extractAttributes(data) {
      const extractedAttributes = [
        ...data.filter((item) => desiredAttributes.includes(item.attribute)),
      ];
      return extractedAttributes;
    }

    async function getPlayer() {
      if (playerID.length > 0 && userTeam) {
        const response = await fetch(fixUrl(`/players/${playerID}`), {
          headers: {
            Authorization: `Bearer ${teamID}`,
          },
        });
        const apiData = await response.json();
        const extractedAttributes = extractAttributes(apiData.attributes);
        setPlayer(apiData);
        if (savedAttributes) {
          const filteredObjects = [
            ...apiData.attributes.filter((ogAttribute) =>
              savedAttributes.some(
                (attribute) => attribute === ogAttribute.attribute
              )
            ),
          ];
          setAttributes(filteredObjects);
        } else {
          setAttributes(extractedAttributes);
        }
        const apiAttributeStates = apiData.attributes.map(({ attribute }) => {
          const agreement = savedAttributes
            ? savedAttributes.includes(attribute)
            : desiredAttributes.includes(attribute);
          return {
            agreement: agreement,
            attribute: attribute,
          };
        });
        setAttributeStates(apiAttributeStates);
      }
    }
    getPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!player ? (
        <div className={styles.isLoading}>
          <Spinner />
        </div>
      ) : (
        <>
          <PlayerTemplate
            id={player.id}
            name={player.name}
            position={player.position[0].position}
            number={player.number}
            artefacts={player.artefacts}
            salary={player.salary}
            matchForm={player.matchForm}
            race={player.race}
            injuryLevel={player.injuryLevel}
            cityOfOrigin={player.cityOfOrigin}
            isSinglePlayerView
            onClick={(e) => {
              setModalVisible(e);
              if (e === 'SELL') {
                setToday(new Date());
              }
            }}
          />
          {player.team === userTeam.id && (
            <>
              <RadarStats data={attributes} />
              <Attributes
                player={player}
                attributeStates={attributeStates}
                setAttributeStates={setAttributeStates}
                setAttributes={setAttributes}
              />
            </>
          )}
          <StatsRanking
            player={player}
            statsSelectValue={statsSelectValue}
            setStatsSelectValue={setStatsSelectValue}
          />
          <PersonalStatistics
            player={player}
            statsSelectValue={statsSelectValue}
          />
          <BestPositions player={player} />
          <TransferHistory userTeam={userTeam} player={player} />
          <AnimatePresence>
            {modalVisible === 'RELEASE' && (
              <ReleaseModal player={player} setModalVisible={setModalVisible} />
            )}
            {modalVisible === 'SELL' && (
              <SellModal
                player={player}
                setModalVisible={setModalVisible}
                today={today}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default PlayerProfile;
