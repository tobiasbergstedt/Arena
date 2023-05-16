import { func, object } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import Button from 'components/Button/Button';
import InputTextNew from 'components/inputs/InputText/InputTextNew';
import Select from 'components/inputs/Select/Select';

import styles from './Artefact.module.scss';

const Artefact = ({
  setSearchInputArtefact,
  searchInputArtefact,
  handleKeyPress,
  getSearchResultArtefacts,
}) => {
  const { t } = useTranslation();

  const inputs = [
    {
      value: searchInputArtefact.minBid,
      onChange: (data) => {
        setSearchInputArtefact({
          ...searchInputArtefact,
          minBid: data,
        });
      },
      label: t('marketplace.inputs.minBid'),
    },
    {
      value: searchInputArtefact.maxBid,
      onChange: (data) => {
        setSearchInputArtefact({
          ...searchInputArtefact,
          maxBid: data,
        });
      },
      label: t('marketplace.inputs.maxBid'),
    },
  ];

  const animVariants = {
    initial: { x: '100vw' },
    visible: {
      x: '0px',
      transition: { duration: 1 },
    },
    after: { x: '100vw', transition: { duration: 1 } },
  };

  return (
    <motion.div
      key="artefactsOptionsWrapper"
      variants={animVariants}
      initial="initial"
      animate="visible"
      exit="after"
      className={styles.artefactsOptionsWrapper}
    >
      <Select
        value={searchInputArtefact.race}
        options={[
          t('artefacts.any'),
          t('artefacts.amulet'),
          t('artefacts.aura'),
          t('artefacts.cantaniRing'),
          t('artefacts.gryphonBoots'),
          t('artefacts.mithrilArmor'),
          t('artefacts.shadowBrew'),
          t('artefacts.siicusTattoo'),
        ]}
        onChange={(data) => {
          setSearchInputArtefact({
            ...searchInputArtefact,
            artefactType:
              (data === t('artefacts.any') && t('artefacts.short.any')) ||
              (data === t('artefacts.amulet') && t('artefacts.short.amulet')) ||
              (data === t('artefacts.aura') && t('artefacts.short.aura')) ||
              (data === t('artefacts.cantaniRing') &&
                t('artefacts.short.cantaniRing')) ||
              (data === t('artefacts.gryphonBoots') &&
                t('artefacts.short.gryphonBoots')) ||
              (data === t('artefacts.mithrilArmor') &&
                t('artefacts.short.mithrilArmor')) ||
              (data === t('artefacts.shadowBrew') &&
                t('artefacts.short.shadowBrew')) ||
              (data === t('artefacts.siicusTattoo') &&
                t('artefacts.short.siicusTattoo')),
          });
        }}
        label={t('marketplace.dropdowns.artefactType')}
        key={t('marketplace.dropdowns.artefactType')}
      />
      <div className={styles.inputsWrapper}>
        {inputs.map(({ value, onChange, label }) => (
          <InputTextNew
            value={value}
            onChange={onChange}
            onKeyDown={() => handleKeyPress(event)}
            label={label}
            key={label}
            type="tel"
          />
        ))}
      </div>

      <Button onClick={getSearchResultArtefacts}>
        {t('marketplace.search')}
      </Button>
    </motion.div>
  );
};

Artefact.propTypes = {
  searchInputArtefact: object,
  setSearchInputArtefact: func,
  handleKeyPress: func,
  getSearchResultArtefacts: func,
};

export default Artefact;
