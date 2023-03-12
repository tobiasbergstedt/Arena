import { useNavigate } from 'react-router-dom';
import { bool } from 'prop-types';

import SpinnerGlobe from 'components/SpinnerGlobe/SpinnerGlobe';

import styles from './VerifyingNumber.module.scss';
import { useContext, useEffect } from 'react';
import { EditContext } from 'context/EditContext';

const VerifyingNumber = ({ isVerified }) => {
  const { setStep } = useContext(EditContext);
  const navigate = useNavigate();

  useEffect(() => {
    // if (isVerified) {
    setTimeout(() => {
      navigate('/profile/personal-information');
      setStep(1);
    }, 1500);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerified]);

  return (
    <div className={styles.loadingWrapper}>
      <SpinnerGlobe isSmall hasNoOutline className={styles.spinnerGlobe} />
    </div>
  );
};

VerifyingNumber.propTypes = {
  isVerified: bool,
};

VerifyingNumber.defaultProps = {
  isVerified: false,
};

export default VerifyingNumber;
