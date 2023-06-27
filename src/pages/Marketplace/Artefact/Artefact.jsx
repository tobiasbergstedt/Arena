import { func, object } from 'prop-types';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button/Button';
import InputText from 'components/inputs/InputText/InputText';
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

  return (
    <>
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
          <InputText
            value={value}
            onChange={onChange}
            onKeyDown={(event) => handleKeyPress(event)}
            label={label}
            key={label}
            type="tel"
          />
        ))}
      </div>

      <Button onClick={getSearchResultArtefacts}>
        {t('marketplace.search')}
      </Button>
    </>
  );
};

Artefact.propTypes = {
  searchInputArtefact: object,
  setSearchInputArtefact: func,
  handleKeyPress: func,
  getSearchResultArtefacts: func,
};

export default Artefact;
