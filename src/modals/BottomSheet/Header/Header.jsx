import { string, func } from 'prop-types';
import { ReactComponent as CloseIcon } from 'assets/icons/close-cross.svg';

import styles from './Header.module.scss';

const Header = ({ label, onCloseClick }) => {
  return (
    <div className={styles.wrapper}>
      <h4>{label}</h4>
      {onCloseClick && (
        <button type="button" onClick={onCloseClick}>
          <CloseIcon className={styles.closeButton} />
        </button>
      )}
    </div>
  );
};

Header.propTypes = {
  label: string,
  onCloseClick: func,
};

Header.defaultProps = {
  label: null,
  onCloseClick: null,
};

export default Header;
