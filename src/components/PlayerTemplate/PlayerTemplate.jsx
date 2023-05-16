import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { string, number, arrayOf, bool, func, object } from 'prop-types';
import { motion } from 'framer-motion';

import PlayerNumber from 'assets/icons/player-number.svg';
import { ReactComponent as OpenCloseArrow } from 'assets/icons/caret.svg';
import ArtefactsDisplay from 'components/PlayerTemplate/Artefacts/ArtefactsDisplay';

import styles from './PlayerTemplate.module.scss';
import Button from 'components/Button/Button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import InputTextNew from 'components/inputs/InputText/InputTextNew';

const PlayerTemplate = ({
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
  onClick,
  isSinglePlayerView,
  isTransferList,
}) => {
  const [isTranferObjectOpen, setIsTranferObjectOpen] = useState(false);
  const [inputData, setInputData] = useState('');

  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      key={id}
      className={clsx(styles.playerWrapper, {
        [styles.isSinglePlayerView]: isSinglePlayerView,
        [styles.isTransferList]: isTransferList,
      })}
      onClick={isTransferList ? () => null : () => navigate(`/player/${id}`)}
    >
      <div
        className={clsx(styles.topWrapper, {
          [styles.topWrapperTransferList]: isTransferList,
        })}
        onClick={isTransferList ? () => navigate(`/player/${id}`) : () => null}
      >
        <div className={styles.playerNumberWrapper}>
          <div
            className={styles.playerJersey}
            style={{
              maskImage: `url(${PlayerNumber})`,
              WebkitMaskImage: `url(${PlayerNumber})`,
            }}
          ></div>
          <span className={styles.playerNumber}>{number}</span>
        </div>
        <div className={styles.nameAndPos}>
          <p
            className={clsx(styles.playerName, {
              [styles.isSinglePlayerView]: isSinglePlayerView,
            })}
          >
            {name}
          </p>
          <p
            className={clsx(`goldenText`, styles.position, {
              [styles.isSinglePlayerView]: isSinglePlayerView,
            })}
          >
            {position}
          </p>
        </div>
        <ArtefactsDisplay artefacts={artefacts} />
      </div>
      <div className={styles.bottomWrapper}>
        <div className={styles.left}>
          <div className={styles.textBlock}>
            <p>Salary:</p>
            <p>{salary} gold</p>
          </div>
          <div className={styles.textBlock}>
            {isTransferList ? (
              <>
                <p>Bid:</p>
                <p>{bid.toLocaleString()} gold</p>
              </>
            ) : (
              <>
                <p>Match form:</p>
                <p>{matchForm}%</p>
              </>
            )}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.textBlock}>
            <p>Race:</p>
            <p>{race}</p>
          </div>
          <div className={styles.textBlock}>
            <p>Injury level:</p>
            <p>{injuryLevel}</p>
          </div>
        </div>
      </div>
      {isTransferList && (
        <>
          <p className={styles.deadline}>
            Deadline:
            <span style={{ marginLeft: '16px' }}>{endDate.slice(0, -3)}</span>
          </p>
          <p className={styles.team}>
            Team: <span style={{ marginLeft: '16px' }}>{teamName}</span>
          </p>
          <motion.span
            className={styles.openCloseArrow}
            style={
              isTranferObjectOpen
                ? {
                    transform: 'rotate(-90deg)',
                  }
                : {
                    transform: 'rotate(0deg)',
                  }
            }
          >
            <OpenCloseArrow
              className={styles.openCloseArrowIcon}
              onClick={() => setIsTranferObjectOpen(!isTranferObjectOpen)}
            />
          </motion.span>
          <div
            className={clsx(styles.attributesAndPlaceBid, {
              [styles.isOpen]: isTranferObjectOpen,
            })}
          >
            <div>
              <p className={clsx(`goldenText`, styles.attributes)}>
                {t('playerProfile.attributes')}
              </p>
              <div className={styles.attributesWrapper}>
                {attributes.map((attribute) => (
                  <div
                    key={attribute.attribute}
                    className={styles.innerWrapper}
                  >
                    <p>{attribute.attribute}:</p>
                    <p>{attribute.value}</p>
                  </div>
                ))}
              </div>
              <InputTextNew
                value={inputData.value}
                onChange={(data) => {
                  setInputData({ ...inputData, userName: data });
                }}
                onKeyDown={() => null}
                label={t('marketplace.newBid')}
              />
              <Button>{t('marketplace.placeBid')}</Button>
            </div>
          </div>
        </>
      )}
      {isSinglePlayerView && (
        <>
          <div className={styles.textBlock}>
            <p>
              City of origin:{' '}
              <span className={styles.cityOfOrigin}>{cityOfOrigin}</span>
            </p>
          </div>
          <div className={styles.playerOptions}>
            <Button isSmall onClick={() => onClick('SELL')}>
              Sell
            </Button>
            <Button isSmall onClick={() => onClick('EDIT')}>
              Edit
            </Button>
            <Button isSmall onClick={() => onClick('RELEASE')}>
              Release
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

PlayerTemplate.propTypes = {
  id: string,
  name: string,
  position: string,
  number: number,
  artefacts: arrayOf(string),
  salary: number,
  matchForm: number,
  race: string,
  injuryLevel: number,
  cityOfOrigin: string,
  endDate: string,
  bid: number,
  teamName: string,
  attributes: arrayOf(object),
  onClick: func,
  isSinglePlayerView: bool,
  isTransferList: bool,
};

PlayerTemplate.defaultProps = {
  id: '',
  name: '',
  position: '',
  number: 0,
  artefacts: [],
  salary: 0,
  matchForm: 0,
  race: '',
  injuryLevel: 0,
  cityOfOrigin: '',
  endDate: '',
  bid: 0,
  teamName: '',
  attributes: [{}],
  onClick: () => {},
  isSinglePlayerView: false,
  isTransferList: false,
};

export default PlayerTemplate;
