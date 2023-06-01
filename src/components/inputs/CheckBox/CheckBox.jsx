import { element, func, bool } from 'prop-types';
import clsx from 'clsx';

import styles from './CheckBox.module.scss';

const CheckBox = ({ isLarge, onChange, agreement, children }) => {
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
      {children}
    </div>
  );
};

CheckBox.propTypes = {
  isLarge: bool,
  children: element || null,
  onChange: func,
  agreement: bool,
};

CheckBox.defaultProps = {
  isLarge: false,
  children: null,
  onChange: () => {},
  agreement: false,
};

export default CheckBox;
