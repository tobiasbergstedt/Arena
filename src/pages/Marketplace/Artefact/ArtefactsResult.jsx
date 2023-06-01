import { useContext, useState } from 'react';
import clsx from 'clsx';
import { array, func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import fixUrl from 'utils/fix-url';
import { UserContext } from 'context/UserContext';

import ItemHeadings from 'components/ItemHeadings/ItemHeadings';
import Button from 'components/Button/Button';
import InputText from 'components/inputs/InputText/InputText';

import { ReactComponent as OpenCloseArrow } from 'assets/icons/caret.svg';
import Aura from 'assets/icons/artefacts/aura.svg';
import Amulet from 'assets/icons/artefacts/amulet.svg';
import CantaniRing from 'assets/icons/artefacts/cantani-ring.svg';
import GryphonBoots from 'assets/icons/artefacts/gryphon-boots.svg';
import MithrilArmor from 'assets/icons/artefacts/mithril-armor.svg';
import ShadowBrew from 'assets/icons/artefacts/shadow-brew.svg';
import SiicusTattoo from 'assets/icons/artefacts/siicus-tattoo.svg';

import styles from './ArtefactsResult.module.scss';

const ArtefactsResult = ({ searchResultArtefact, setSearchResultArtefact }) => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [inputData, setInputData] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  const { t } = useTranslation();

  const renderArtefacts = (type) => {
    const imageMap = {
      amulet: Amulet,
      aura: Aura,
      cantaniRing: CantaniRing,
      gryphonBoots: GryphonBoots,
      mithrilArmor: MithrilArmor,
      shadowBrew: ShadowBrew,
      siicusTattoo: SiicusTattoo,
    };
    const src = imageMap[type];

    return src;
  };

  const handlePlaceBid = async (id, inputData, userID, bid, bidder, index) => {
    if (
      inputData &&
      inputData > bid[bid.length - 1] &&
      userID !== bidder[bidder.length - 1]
    ) {
      await fetch(fixUrl(`/transferlist/artefacts/${id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idString: id,
          bid: [...bid, Number(inputData)],
          bidder: [...bidder, userID],
        }),
      }).then((response) => {
        if (response.status === 200) {
          setErrorMessage(t('errorMessages.successful'));
          searchResultArtefact[index] = {
            ...searchResultArtefact[index],
            bid: [...bid, inputData],
            bidder: [...bidder, userID],
          };
        } else {
          setErrorMessage('');
        }
      });
    } else if (userID === bidder[bidder.length - 1]) {
      setErrorMessage(t('errorMessages.alreadyHighestBidder'));
    } else if (!inputData || inputData <= bid[bid.length - 1]) {
      setErrorMessage(t('errorMessages.bidMustBeHigher'));
    }

    setTimeout(() => {
      setErrorMessage('');
    }, 2500);
  };

  return (
    <>
      <div className={styles.headings}>
        <ItemHeadings
          heading={t('marketplace.heading')}
          subHeading={`${searchResultArtefact.length} ${
            searchResultArtefact.length > 1
              ? t('marketplace.results')
              : searchResultArtefact.length === 0
              ? t('marketplace.results')
              : t('marketplace.result')
          }`}
          hasButton={t('general.return')}
          onClick={() => setSearchResultArtefact([])}
        />
        <p className={styles.playerResultsDescription}>
          {t('marketplace.resultDescriptionArtefacts')}
        </p>
        <p className={styles.amountDisplayed}>
          ({t('marketplace.displaying')} 1-
          {searchResultArtefact?.length <= 9
            ? searchResultArtefact.length
            : '10'}
          )
        </p>
      </div>
      {searchResultArtefact.map(({ id, type, endDate, bid, bidder }, index) => (
        <div className={styles.artefactWrapper} key={id}>
          <div className={styles.artefactHeading}>
            <div className={styles.left}>
              <img
                src={renderArtefacts(type)}
                alt={type}
                className={styles.artefactImage}
              />
            </div>
            <div className={styles.right}>
              <p className={styles.artefactTitle}>{t(`artefacts.${type}`)}</p>
              <p className={clsx('goldenText', styles.artefactDescription)}>
                {t(`artefacts.description.${type}`)}
              </p>
            </div>
          </div>
          <div className={styles.bidContainer}>
            <p className={styles.bidParagraph}>
              {t('marketplace.highestBid')} {bid[bid.length - 1]}
            </p>
            <p className={styles.bidParagraph}>
              {t('marketplace.deadline')}{' '}
              {new Date(endDate.seconds * 1000).toLocaleString(
                t('global.localeString')
              )}
            </p>
          </div>
          <motion.span
            className={styles.openCloseArrow}
            style={
              isOpen
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
              onClick={() => setIsOpen(!isOpen)}
            />
          </motion.span>
          <div
            className={clsx(styles.placeBid, {
              [styles.isOpen]: isOpen,
            })}
          >
            <div>
              <InputText
                value={inputData}
                onChange={(data) => {
                  setInputData(data);
                }}
                label={t('marketplace.newBid')}
                type="tel"
              />
              <Button
                onClick={() =>
                  handlePlaceBid(id, inputData, user.uid, bid, bidder, index)
                }
              >
                {t('marketplace.placeBid')}
              </Button>
              <div
                className={clsx(styles.errorMessage, {
                  [styles.errorMessageIsOpen]: errorMessage.length > 0,
                  [styles.isSuccessful]:
                    errorMessage === t('errorMessages.successful'),
                })}
              >
                <div>{errorMessage}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

ArtefactsResult.propTypes = {
  searchResultArtefact: array,
  setSearchResultArtefact: func,
};

export default ArtefactsResult;
