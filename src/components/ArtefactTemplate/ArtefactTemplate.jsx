import { useContext, useState } from 'react';
import clsx from 'clsx';
import { string, number, array, func } from 'prop-types';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import fixUrl from 'utils/fix-url';
import { UserContext } from 'context/UserContext';

import Button from 'components/Button/Button';
import InputText from 'components/inputs/InputText/InputText';

import Aura from 'assets/icons/artefacts/aura.svg';
import Amulet from 'assets/icons/artefacts/amulet.svg';
import CantaniRing from 'assets/icons/artefacts/cantani-ring.svg';
import GryphonBoots from 'assets/icons/artefacts/gryphon-boots.svg';
import MithrilArmor from 'assets/icons/artefacts/mithril-armor.svg';
import ShadowBrew from 'assets/icons/artefacts/shadow-brew.svg';
import SiicusTattoo from 'assets/icons/artefacts/siicus-tattoo.svg';
import { ReactComponent as OpenCloseArrow } from 'assets/icons/caret.svg';

import styles from './ArtefactTemplate.module.scss';

const ArtefactTemplate = ({
  id,
  type,
  endDate,
  bid,
  bidder,
  index,
  searchResultArtefact,
  setSearchResultArtefact,
}) => {
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

  console.log(user);

  const handlePlaceBid = async () => {
    if (!inputData || inputData <= bid[bid.length - 1]) {
      setErrorMessage(t('errorMessages.bidMustBeHigher'));
    } else if (user.uid === bidder[bidder.length - 1]) {
      setErrorMessage(t('errorMessages.alreadyHighestBidder'));
    } else {
      const updatedBid = [...bid, Number(inputData)];
      const updatedBidder = [...bidder, user.uid];

      const response = await fetch(fixUrl(`/transferlist/artefacts/${id}`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idString: id,
          bid: updatedBid,
          bidder: updatedBidder,
        }),
      });

      if (response.status === 200) {
        setErrorMessage(t('errorMessages.successful'));
        const updatedSearchResultArtefact = [...searchResultArtefact];
        updatedSearchResultArtefact[index] = {
          ...searchResultArtefact[index],
          bid: updatedBid,
          bidder: updatedBidder,
        };
        setSearchResultArtefact(updatedSearchResultArtefact);
      } else {
        setErrorMessage('');
      }
    }

    setTimeout(() => {
      setErrorMessage('');
    }, 2500);
  };

  return (
    <div className={styles.artefactWrapper}>
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
          <Button onClick={() => handlePlaceBid()}>
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
  );
};

ArtefactTemplate.propTypes = {
  id: string,
  type: string,
  endDate: string,
  bid: number,
  bidder: string,
  index: number,
  searchResultArtefact: array,
  setSearchResultArtefact: func,
};

ArtefactTemplate.defaultProps = {
  id: '',
  type: '',
  endDate: '',
  bid: 0,
  bidder: '',
  index: 0,
  searchResultArtefact: [],
  setSearchResultArtefact: () => {},
};

export default ArtefactTemplate;
