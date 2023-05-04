import { useRef } from 'react';
import { func, object } from 'prop-types';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

import Button from 'components/Button/Button';
import InputTextNew from 'components/inputs/InputText/InputTextNew';
import Select from 'components/inputs/Select/Select';

import styles from './Artefact.module.scss';

const Artefact = ({
  setSearchInputArtefact,
  searchInputArtefact,
  handleKeyPress,
}) => {
  const inputRef = useRef();

  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    input: Yup.string()
      .trim()
      .min(4, 'Användarnamnet måste vara minst 4 tecken långt.')
      .required('Du måste fylla i ett nytt användarnamn.'),
  });

  const inputs = [
    {
      value: searchInputArtefact.minBid,
      onChange: (data) => {
        setSearchInputArtefact({
          ...searchInputArtefact,
          minBid: data.value,
        });
      },
      label: t('marketplace.inputs.minBid'),
    },
    {
      value: searchInputArtefact.maxBid,
      onChange: (data) => {
        setSearchInputArtefact({
          ...searchInputArtefact,
          maxBid: data.value,
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
          t('artefacts.amulet'),
          t('artefacts.aura'),
          t('artefacts.cantaniRing'),
          t('artefacts.gryphonBoots'),
          t('artefacts.mithrilArmor'),
          t('artefacts.shadowBrew'),
          t('artefacts.siicusTattoo'),
        ]}
        onChange={(data) => {
          setSearchInputArtefact({ ...searchInputArtefact, race: data });
        }}
        label={t('marketplace.dropdowns.artefactType')}
        key={t('marketplace.dropdowns.artefactType')}
      />
      <div className={styles.inputsWrapper}>
        {inputs.map(({ value, onChange, label }) => (
          <InputTextNew
            value={value}
            ref={inputRef}
            validationSchema={validationSchema}
            onChange={onChange}
            onKeyDown={() => handleKeyPress(event)}
            label={label}
            key={label}
          />
        ))}
      </div>
      <Button>{t('marketplace.search')}</Button>
    </motion.div>
  );
};

Artefact.propTypes = {
  searchInputArtefact: object,
  setSearchInputArtefact: func,
  handleKeyPress: func,
};

export default Artefact;
