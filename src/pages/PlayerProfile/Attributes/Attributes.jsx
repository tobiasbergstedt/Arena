import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { object, array, func } from 'prop-types';
import clsx from 'clsx';

import { UserContext } from 'context/UserContext';

import CheckBox from 'components/inputs/CheckBox/CheckBox';

import styles from './Attributes.module.scss';

const Attributes = ({
  player,
  attributeStates,
  setAttributeStates,
  setAttributes,
}) => {
  const { setSavedAttributes } = useContext(UserContext);
  const { t } = useTranslation();

  const onUpdateAttributeStates = (event, attribute, index) => {
    const newState = [...attributeStates];
    newState[index] = { ...newState[index], agreement: event.target.checked };
    setAttributeStates(newState);
    const filteredArray = [
      ...newState
        .filter((obj) => obj.agreement === true)
        .map((obj) => obj.attribute),
    ];
    localStorage.setItem('arenaSavedAttributes', JSON.stringify(filteredArray));
    const filteredObjects = [
      ...player.attributes.filter((ogAttribute) =>
        filteredArray.some((attribute) => attribute === ogAttribute.attribute)
      ),
    ];
    setAttributes(filteredObjects);
    setSavedAttributes(filteredArray);
  };

  return (
    <div className={styles.attributesSelector}>
      <p className={clsx(`goldenText`, styles.attributesHeading)}>
        {t('playerProfile.attributes')}
      </p>
      <div className={styles.attributesContent}>
        {player.attributes &&
          player.attributes.map(({ attribute, value }, index) => (
            <div key={attribute} className={styles.attributeItem}>
              <CheckBox
                onChange={(event) =>
                  onUpdateAttributeStates(event, attribute, index)
                }
                agreement={attributeStates[index]?.agreement}
              >
                <div className={styles.attributeText}>
                  <p>{attribute}</p>
                  <p>{value}</p>
                </div>
              </CheckBox>
            </div>
          ))}
      </div>
    </div>
  );
};

Attributes.propTypes = {
  player: object,
  attributeStates: array,
  setAttributeStates: func,
  setAttributes: func,
  setSavedAttributes: func,
};

Attributes.defaultProps = {
  player: {},
  attributeStates: [],
  setAttributeStates: () => {},
  setAttributes: () => {},
  setSavedAttributes: () => {},
};

export default Attributes;
