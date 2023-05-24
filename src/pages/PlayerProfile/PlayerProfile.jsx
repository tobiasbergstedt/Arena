import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

import fixUrl from 'utils/fix-url';

import { UserContext } from 'context/UserContext';

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
import InputTextNew from 'components/inputs/InputText/InputTextNew';

const PlayerProfile = () => {
  const { t } = useTranslation();
  const { userTeam } = useContext(UserContext);
  const [player, setPlayer] = useState();
  const [modalVisible, setModalVisible] = useState('NONE');
  const [attributeStates, setAttributeStates] = useState([]);
  const [statsSelectValue, setStatsSelectValue] = useState(
    t('statistics.goals')
  );
  const [attributes, setAttributes] = useState([]);
  const [today, setToday] = useState('');
  const [startingBid, setStartingBid] = useState(0);

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

  const handleDeletePlayer = async (playerID) => {
    await fetch(fixUrl(`/players/${playerID}`), {
      method: 'DELETE',
    });
  };

  const handleSellPlayer = async () => {
    var inOneWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 7,
      today.getHours(),
      today.getMinutes()
    );
    const newTransferPlayer = {
      bid: [startingBid],
      bidder: [''],
      endDate: inOneWeek,
      playerId: player.id,
    };

    await fetch(fixUrl('/players/transferlist'), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransferPlayer),
    });
    // setModalVisible('NONE');
  };

  useEffect(() => {
    function extractAttributes(data) {
      const desiredAttributes = [
        'stamina',
        'speed',
        'composure',
        'creativity',
        'passing',
        'dribbling',
        'leadership',
      ];
      const extractedAttributes = data.filter((item) =>
        desiredAttributes.includes(item.attribute)
      );
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
        setAttributes(extractedAttributes);
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
              <div className={styles.attributesVisualizer}>
                <RadarStats data={attributes} />
              </div>
              <div className={styles.attributesSelector}>
                <p className={clsx(`goldenText`, styles.attributesHeading)}>
                  {t('playerProfile.attributes')}
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
            <ItemHeadings
              heading={t('playerProfile.stats')}
              subHeading={t('playerProfile.ranking')}
            />
            <div className={styles.selectWrapper}>
              <Select
                value={statsSelectValue}
                options={selectValues.options}
                onChange={(data) => {
                  setStatsSelectValue(data);
                }}
                label={selectValues.label}
                isSmall
              />
            </div>
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
              <p className={styles.round}>{t('playerProfile.round')}</p>
            </div>
          </div>
          <div className={styles.personalStats}>
            <ItemHeadings
              heading={t('playerProfile.personal')}
              subHeading={t('playerProfile.statistics')}
            />
            <div className={styles.personalStatsContent}>
              <div className={styles.left}>
                <p className={styles.personalStatsSubHeading}>
                  {t(`statistics.${statsSelectValue.toLowerCase()}`)}
                </p>
                <p className={clsx(`goldenText`, styles.attemptsSuccessful)}>
                  {t('playerProfile.attempts')}
                </p>
                <p className={styles.personalStatsNumbers}>
                  {player.attempts &&
                    player.attempts[statsSelectValue.toLowerCase()]}
                </p>
                <p className={clsx(`goldenText`, styles.attemptsSuccessful)}>
                  {t('playerProfile.successful')}
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
            <ItemHeadings
              heading={t('playerProfile.bestSuited')}
              subHeading={t('playerProfile.positions')}
            />
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
            <ItemHeadings
              heading={t('playerProfile.transfer')}
              subHeading={t('playerProfile.history')}
            />
            {player.transferHistory.length > 0 ? (
              <div className={styles.historyText}>
                {player.transferHistory.map(
                  ({ date, soldBy, boughtBy, sum }) => (
                    <div
                      className={styles.historyItem}
                      key={date + sum + soldBy}
                    >
                      <p className="goldenText">{date}</p>
                      <p>
                        {t('playerProfile.from')}: {soldBy}
                      </p>
                      <p>
                        {t('playerProfile.to')}:{' '}
                        {boughtBy ? boughtBy : userTeam.teamName}
                      </p>
                      <p>
                        {t('playerProfile.sum')}: {sum.toLocaleString()}{' '}
                        {t('global.gold')}
                      </p>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className={styles.historyText}>
                {t('playerProfile.loyalHistory', { playerName: player.name })}
              </p>
            )}
          </div>
          <AnimatePresence>
            {modalVisible === 'RELEASE' && (
              <Modal canClose onClick={() => setModalVisible('NONE')}>
                <div className={styles.modalContent}>
                  <h3>
                    {t('playerProfile.release')} {player.name}?
                  </h3>
                  <p>
                    {t('playerProfile.confirmDelete', {
                      playerName: player.name,
                    })}
                  </p>
                </div>
                <div className={styles.buttonsWrapper}>
                  <Button isTertiary onClick={() => handleDeletePlayer()}>
                    {t('buttons.confirm')}
                  </Button>
                  <Button isQuaternary onClick={() => setModalVisible('NONE')}>
                    {t('buttons.cancel')}
                  </Button>
                </div>
              </Modal>
            )}
            {modalVisible === 'SELL' && (
              <Modal canClose onClick={() => setModalVisible('NONE')}>
                <div className={styles.modalContent}>
                  <h3>
                    {t('playerProfile.sell')} {player.name}?
                  </h3>
                  <p>
                    {t('playerProfile.transferListInfo', {
                      playerName: player.name,
                    })}
                  </p>
                  <p className={styles.deadline}>
                    {t('marketplace.deadline')}{' '}
                    {new Date(
                      today.getFullYear(),
                      today.getMonth(),
                      today.getDate() + 7,
                      today.getHours(),
                      today.getMinutes(),
                      today.getSeconds()
                    ).toLocaleString(t('global.localeString'))}
                  </p>
                  <p>({t('playerProfile.endDateInfo')})</p>
                  <p>{t('playerProfile.transferInfo')}.</p>
                </div>
                <div className={styles.buttonsWrapper}>
                  <InputTextNew
                    type="tel"
                    isLight
                    label={t('playerProfile.startingBid')}
                    onChange={(value) => setStartingBid(value)}
                  />
                  <Button isTertiary onClick={() => handleSellPlayer()}>
                    {t('playerProfile.sell')}
                  </Button>
                  <Button isQuaternary onClick={() => setModalVisible('NONE')}>
                    {t('buttons.cancel')}
                  </Button>
                </div>
              </Modal>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default PlayerProfile;
