import { useEffect, useState, useContext } from 'react';
import { string, arrayOf, bool } from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { EditContext } from 'context/EditContext';

import { ReactComponent as BackIcon } from 'assets/icons/back-arrow.svg';

import styles from './NavigationBar.module.scss';

const NavigationBar = ({ slugs, label, isValueChanged }) => {
  const { setIsInputAlertVisible, setNavigationTarget } =
    useContext(EditContext);
  const [shouldNavigate, setShouldNavigate] = useState(true);
  const navigate = useNavigate();

  const navigateAction = () => {
    const parentSlug = slugs.slice(0, -1).join('/');
    if (shouldNavigate) {
      navigate(parentSlug);
    } else {
      setIsInputAlertVisible(true);
      setNavigationTarget(parentSlug);
    }
  };

  useEffect(() => {
    if (isValueChanged) {
      setShouldNavigate(false);
    }
    if (!isValueChanged) {
      setShouldNavigate(true);
    }
  }, [isValueChanged]);

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        onClick={() => {
          navigateAction();
        }}
      >
        <BackIcon className={styles.backButton} />
      </button>
      <h4>{label}</h4>
    </div>
  );
};

NavigationBar.propTypes = {
  slugs: arrayOf(string).isRequired,
  label: string,
  isValueChanged: bool,
};

NavigationBar.defaultProps = {
  label: null,
  isValueChanged: false,
};

export default NavigationBar;
