import { string, func, bool, arrayOf } from 'prop-types';
import clsx from 'clsx';

import styles from './CheckBox.module.scss';

const CheckBox = ({ isLarge, onChange, onClick, agreement, text }) => {
  return (
    <div className={styles.checked}>
      <label
        className={clsx(styles.checkBoxWrapper, {
          [styles.isLarge]: isLarge,
        })}
      >
        <input
          type="checkbox"
          name="checked"
          id="checked"
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
  agreement: arrayOf(bool),
};

CheckBox.defaultProps = {
  isLarge: false,
  text: '',
};

export default CheckBox;
