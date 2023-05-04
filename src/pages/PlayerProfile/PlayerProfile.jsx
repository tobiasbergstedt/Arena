import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import fixUrl from 'utils/fix-url';

import { UserContext } from 'context/UserContext';

import Page from 'components/Page/Page';
import PlayerTemplate from 'components/PlayerTemplate/PlayerTemplate';
import CheckBox from 'components/inputs/CheckBox/CheckBox';
import ItemHeadings from 'components/ItemHeadings/ItemHeadings';
import Button from 'components/Button/Button';
import Select from 'components/inputs/Select/Select';
import RadarStats from 'components/Charts/RadarStats/RadarStats';
import LineStats from 'components/Charts/LineStats/LineStats';
import DonutStats from 'components/Charts/DonutStats/DonutStats';
import Modal from 'modals/Modal/Modal';

import styles from './PlayerProfile.module.scss';
import Spinner from 'components/Spinner/Spinner';

const PlayerProfile = () => {
  const { t } = useTranslation();
  const { userTeam } = useContext(UserContext);
  // eslint-disable-next-line no-unused-vars
  const [player, setPlayer] = useState();
  const [modalVisible, setModalVisible] = useState('NONE');
  const [attributeStates, setAttributeStates] = useState([]);
  // const [radarData, setRadarData] = useState([]);
  const [statsSelectValue, setStatsSelectValue] = useState(
    t('statistics.goals')
  );

  const location = useLocation();
  const slugs = location.pathname?.split('/') ?? [];

  const playerID = slugs[slugs.length - 1];
  const teamID = userTeam.id;

  const selectValues = {
    options: [
      t('statistics.goals'),
      t('statistics.hoops'),
      t('statistics.intercepts'),
      t('statistics.assists'),
      t('statistics.saves'),
      t('statistics.blocks'),
    ],
    label: t('statistics.goals'),
  };

  const updateAttribute = (index) => {
    const newState = [...attributeStates];
    newState[index] = !newState[index];
    setAttributeStates(newState);
    console.log('clicked');
  };

  useEffect(() => {
    async function getPlayers() {
      if (playerID.length > 0 && userTeam) {
        const response = await fetch(fixUrl(`/players/${playerID}`), {
          headers: {
            Authorization: `Bearer ${teamID}`,
          },
        });
        const apiData = await response.json();
        setPlayer(apiData);
      }
    }
    getPlayers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page pageTitle={t('pageTitles.player')}>
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
            onClick={(e) => setModalVisible(e)}
          />
          {player.team === userTeam.id && (
            <>
              <div className={styles.attributesVisualizer}>
                <RadarStats data={player.attributes} />
              </div>
              <div className={styles.attributesSelector}>
                <p className={clsx(`goldenText`, styles.attributesHeading)}>
                  Attributes
                </p>
                <div className={styles.attributesContent}>
                  {player.attributes &&
                    player.attributes.map(({ attribute, value }, index) => (
                      <div key={attribute} className={styles.attributeItem}>
                        <CheckBox
                          onChange={(event) => {
                            const newState = [...attributeStates];
                            newState[index] = event.target.checked;
                            setAttributeStates(newState);
                          }}
                          onClick={() => updateAttribute(index)}
                          agreement={attributeStates}
                        />
                        <div className={styles.attributeText}>
                          <p>{attribute}</p>
                          <p>{value}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
          <div className={styles.statsRanking}>
            <ItemHeadings heading={'Stats'} subHeading={'Ranking'} />
            <Select
              value={statsSelectValue}
              options={selectValues.options}
              onChange={(data) => {
                setStatsSelectValue(data);
              }}
              label={selectValues.label}
              isSmall
            />
            <div className={styles.lineStats}>
              <LineStats
                data={
                  player.statsRanking &&
                  player.statsRanking[statsSelectValue.toLowerCase()]
                }
                labels={
                  player.statsRanking &&
                  player.statsRanking[statsSelectValue.toLowerCase()]
                }
              />
              <p className={styles.round}>Round</p>
            </div>
          </div>
          <div className={styles.personalStats}>
            <ItemHeadings heading={'Personal'} subHeading={'Statistics'} />
            <div className={styles.personalStatsContent}>
              <div className={styles.left}>
                <p className={styles.personalStatsSubHeading}>
                  {t(`statistics.${statsSelectValue.toLowerCase()}`)}
                </p>
                <p className={clsx(`goldenText`, styles.attemptsSuccessful)}>
                  Attempts
                </p>
                <p className={styles.personalStatsNumbers}>
                  {player.attempts &&
                    player.attempts[statsSelectValue.toLowerCase()]}
                </p>
                <p className={clsx(`goldenText`, styles.attemptsSuccessful)}>
                  Successful
                </p>
                <p className={styles.personalStatsNumbers}>
                  {player.stats && player.stats[statsSelectValue.toLowerCase()]}
                </p>
              </div>
              <div className={styles.right}>
                <DonutStats
                  attempts={
                    player.attempts &&
                    player.attempts[statsSelectValue.toLowerCase()]
                  }
                  successful={
                    player.stats && player.stats[statsSelectValue.toLowerCase()]
                  }
                />
                <p className={styles.percentage}>
                  {player.attempts &&
                  player.stats &&
                  !isNaN(
                    player.stats[statsSelectValue.toLowerCase()] /
                      player.attempts[statsSelectValue.toLowerCase()]
                  )
                    ? Math.round(
                        (player.stats[statsSelectValue.toLowerCase()] /
                          player.attempts[statsSelectValue.toLowerCase()]) *
                          100
                      )
                    : 100}
                  %
                </p>
              </div>
            </div>
          </div>
          <div className={styles.bestPositions}>
            <ItemHeadings heading={'Best suited'} subHeading={'Positions'} />
            <div className={styles.positionsList}>
              {player.position.map(({ position, fit }) => (
                <div className={styles.positionItem} key={position + fit}>
                  <div className={styles.donut}>
                    <DonutStats isSmall attempts={100} successful={fit} />
                  </div>
                  <p>{position}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.transferHistory}>
            <ItemHeadings heading={'Transfer'} subHeading={'History'} />
            {player.transferHistory.length > 0 ? (
              <div className={styles.historyText}>
                {player.transferHistory.map(
                  ({ date, soldBy, boughtBy, sum }) => (
                    <div
                      className={styles.historyItem}
                      key={date + sum + soldBy}
                    >
                      <p className="goldenText">{date}</p>
                      <p>From: {soldBy}</p>
                      <p>To: {boughtBy}</p>
                      <p>Sum: {sum.toLocaleString()} gold</p>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className={styles.historyText}>
                {player.name} has been loyal to Behemot Bashers for his entire
                career, after being brought up from the clubs youth department.
              </p>
            )}
          </div>
          <AnimatePresence>
            {modalVisible === 'RELEASE' && (
              <Modal canClose onClick={() => setModalVisible('NONE')}>
                <h3>Släppa &#34;Spelarnamn&#34;?</h3>
                <p>
                  Är du säker på att du vill släppa &#34;Spelarnamn&#34;? Det
                  här beslutet går inte att ångra.
                </p>
                <div className={styles.buttonsWrapper}>
                  <Button isSmall isTertiary>
                    Confirm
                  </Button>
                  <Button
                    isSmall
                    isQuaternary
                    onClick={() => setModalVisible('NONE')}
                  >
                    Cancel
                  </Button>
                </div>
              </Modal>
            )}
          </AnimatePresence>
        </>
      )}
    </Page>
  );
};

export default PlayerProfile;
