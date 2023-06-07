import { arrayOf, string, bool } from 'prop-types';

import Amulet from 'assets/icons/artefacts/amulet.svg';
import Aura from 'assets/icons/artefacts/aura.svg';
import CantaniRing from 'assets/icons/artefacts/cantani-ring.svg';
import GryphonBoots from 'assets/icons/artefacts/gryphon-boots.svg';
import MithrilArmor from 'assets/icons/artefacts/mithril-armor.svg';
import ShadowBrew from 'assets/icons/artefacts/shadow-brew.svg';
import SiicusTattoo from 'assets/icons/artefacts/siicus-tattoo.svg';

import styles from './ArtefactsDisplay.module.scss';
import clsx from 'clsx';

const ArtefactsDisplay = ({ artefacts, isSinglePlayerView }) => {
  const renderArtefacts = () => {
    const imageMap = {
      amulet: Amulet,
      aura: Aura,
      cantaniRing: CantaniRing,
      gryphonBoots: GryphonBoots,
      mithrilArmor: MithrilArmor,
      shadowBrew: ShadowBrew,
      siicusTattoo: SiicusTattoo,
    };

    return artefacts.map((artefact, index) => {
      const src = imageMap[artefact];
      return (
        <img
          key={(src, index)}
          src={src}
          alt={artefact}
          className={styles.artefactImage}
        />
      );
    });
  };

  return (
    <div
      className={clsx(styles.artefactsWrapper, {
        [styles.singlePlayerView]: isSinglePlayerView,
      })}
    >
      <div className={styles.artefacts}>
        {artefacts?.length > 0 && renderArtefacts()}
      </div>
    </div>
  );
};

ArtefactsDisplay.propTypes = {
  artefacts: arrayOf(string),
  isSinglePlayerView: bool,
};

export default ArtefactsDisplay;
