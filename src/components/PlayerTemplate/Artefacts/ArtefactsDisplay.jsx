import { arrayOf, string } from 'prop-types';

import Amulet from 'assets/icons/artefacts/amulet.svg';
import Aura from 'assets/icons/artefacts/aura.svg';
import CantaniRing from 'assets/icons/artefacts/cantani-ring.svg';
import GryphonBoots from 'assets/icons/artefacts/gryphon-boots.svg';
import MithrilArmor from 'assets/icons/artefacts/mithril-armor.svg';
import ShadowBrew from 'assets/icons/artefacts/shadow-brew.svg';
import SiicusTattoo from 'assets/icons/artefacts/siicus-tattoo.svg';

import styles from './ArtefactsDisplay.module.scss';

const ArtefactsDisplay = ({ artefacts }) => {
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

    return artefacts.map((artefact) => {
      const src = imageMap[artefact];
      return (
        <img
          key={src}
          src={src}
          alt={artefact}
          className={styles.artefactImage}
        />
      );
    });
  };

  return (
    <div className={styles.artefactsWrapper}>
      <div className={styles.artefacts}>
        {artefacts?.length > 0 && renderArtefacts()}
      </div>
    </div>
  );
};

ArtefactsDisplay.propTypes = {
  artefacts: arrayOf(string),
};

export default ArtefactsDisplay;
