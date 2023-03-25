import { string, func, bool } from 'prop-types';
import clsx from 'clsx';

import styles from './CheckBox.module.scss';

const CheckBox = ({ isLarge, onChange, onClick, agreement, text }) => {
  return (
    <div className={styles.rememberMe}>
      <label
        className={clsx(styles.checkBoxWrapper, {
          [styles.isLarge]: isLarge,
        })}
      >
        <input
          type="checkbox"
          name="a"
          id="rememberMe"
          className={styles.checkBox}
          onChange={onChange}
          checked={agreement}
        />
        <span
          className={clsx(styles.checkMark, {
            [styles.isLarge]: isLarge,
          })}
        ></span>
      </label>
      <p className={styles.checkBoxLabel} onClick={onClick}>
        {text}
      </p>
    </div>
  );
};

CheckBox.propTypes = {
  isLarge: bool,
  text: string,
  onChange: func,
  onClick: func,
  agreement: bool,
};

CheckBox.defaultProps = {
  isLarge: false,
  text: '',
  onChange: () => {},
  onClick: () => {},
  agreement: false,
};

export default CheckBox;
