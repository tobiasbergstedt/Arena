import { useRef } from 'react';
import { func, object } from 'prop-types';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { motion } from 'framer-motion';

import Button from 'components/Button/Button';
import InputTextNew from 'components/inputs/InputText/InputTextNew';
import Select from 'components/inputs/Select/Select';

import styles from './Player.module.scss';

const Player = ({
  setSearchInputPlayer,
  searchInputPlayer,
  handleKeyPress,
  getSearchResultPlayers,
}) => {
  const inputRef = useRef();

  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    input: Yup.string()
      .trim()
      .min(4, 'Användarnamnet måste vara minst 4 tecken långt.')
      .required('Du måste fylla i ett nytt användarnamn.'),
  });
  const dropdowns = [
    {
      value: searchInputPlayer.race,
      options: [
        t('marketplace.races.any'),
        t('marketplace.races.human'),
        t('marketplace.races.elf'),
        t('marketplace.races.dwarf'),
        t('marketplace.races.orc'),
      ],
      onChange: (data) => {
        setSearchInputPlayer({ ...searchInputPlayer, race: data });
      },
      label: t('marketplace.dropdowns.race'),
    },
    {
      value: searchInputPlayer.position,
      options: [
        t('positions.short.goalkeeper'),
        t('positions.short.centralDefender'),
        t('positions.short.leftRightDefender'),
        t('positions.short.centralMidfielder'),
        t('positions.short.leftRightMidfielder'),
        t('positions.short.centralForward'),
        t('positions.short.leftRightForward'),
      ],
      onChange: (data) => {
        setSearchInputPlayer({
          ...searchInputPlayer,
          position:
            (data === t('positions.short.goalkeeper') &&
              t('positions.goalkeeper')) ||
            (data === t('positions.short.centralDefender') &&
              t('positions.centralDefender')) ||
            (data === t('positions.short.leftRightDefender') &&
              t('positions.leftRightDefender')) ||
            (data === t('positions.short.centralMidfielder') &&
              t('positions.centralMidfielder')) ||
            (data === t('positions.short.leftRightMidfielder') &&
              t('positions.leftRightMidfielder')) ||
            (data === t('positions.short.centralForward') &&
              t('positions.centralForward')) ||
            (data === t('positions.short.leftRightForward') &&
              t('positions.leftRightForward')),
        });
      },
      label: t('marketplace.dropdowns.position'),
    },
    {
      value: searchInputPlayer.minInjury,
      options: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20,
      ],
      onChange: (data) => {
        setSearchInputPlayer({ ...searchInputPlayer, minInjury: data });
      },
      label: t('marketplace.dropdowns.minInjury'),
    },
    {
      value: searchInputPlayer.maxInjury,
      options: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20,
      ],
      onChange: (data) => {
        setSearchInputPlayer({ ...searchInputPlayer, maxInjury: data });
      },
      label: t('marketplace.dropdowns.maxInjury'),
    },
  ];

  const animVariants = {
    initial: { x: '-100vw' },
    visible: {
      x: '0px',
      transition: { duration: 1 },
    },
    after: { x: '-100vw', transition: { duration: 1 } },
  };

  const inputs = [
    {
      value: searchInputPlayer.minSalary,
      onChange: (data) => {
        setSearchInputPlayer({
          ...searchInputPlayer,
          minSalary: data.value,
        });
      },
      label: t('marketplace.inputs.minSalary'),
    },
    {
      value: searchInputPlayer.maxSalary,
      onChange: (data) => {
        setSearchInputPlayer({
          ...searchInputPlayer,
          maxSalary: data.value,
        });
      },
      label: t('marketplace.inputs.maxSalary'),
    },
    {
      value: searchInputPlayer.minBid,
      onChange: (data) => {
        setSearchInputPlayer({
          ...searchInputPlayer,
          minBid: data.value,
        });
      },
      label: t('marketplace.inputs.minBid'),
    },
    {
      value: searchInputPlayer.maxBid,
      onChange: (data) => {
        setSearchInputPlayer({
          ...searchInputPlayer,
          maxBid: data.value,
        });
      },
      label: t('marketplace.inputs.maxBid'),
    },
  ];

  return (
    <motion.div
      key="playersOptionsWrapper"
      variants={animVariants}
      initial="initial"
      animate="visible"
      exit="after"
      className={styles.playersOptionsWrapper}
    >
      <div className={styles.dropdownWrapper}>
        {dropdowns.map(({ value, options, onChange, label }) => (
          <Select
            value={value}
            options={options}
            onChange={onChange}
            label={label}
            isSmall
            key={label}
          />
        ))}
      </div>
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
      <Button onClick={getSearchResultPlayers}>
        {t('marketplace.search')}
      </Button>
    </motion.div>
  );
};

Player.propTypes = {
  searchInputPlayer: object,
  setSearchInputPlayer: func,
  handleKeyPress: func,
  animVariants: object,
  getSearchResultPlayers: func,
};

export default Player;
