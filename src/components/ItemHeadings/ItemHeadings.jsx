import { string, bool, func } from 'prop-types';
import clsx from 'clsx';

import styles from './ItemHeadings.module.scss';

const ItemHeadings = ({
  heading,
  subHeading,
  hasDropDown,
  hasButton,
  onClick,
  isAllCapsSubHeading,
}) => {
  return (
    <div className={styles.itemHeadingsWrapper}>
      <div className={styles.itemHeadingsInnerWrapper}>
        <div className={clsx(`goldenText`, styles.heading)}>{heading}</div>
        <span
          className={clsx(styles.subHeading, {
            [styles.isAllCaps]: isAllCapsSubHeading,
          })}
        >
          {subHeading}
        </span>
      </div>
      {hasDropDown && <select></select>}
      {hasButton && (
        <p className={styles.edit} onClick={onClick}>
          {hasButton}
        </p>
      )}
    </div>
  );
};

ItemHeadings.propTypes = {
  heading: string,
  subHeading: string,
  hasDropDown: bool,
  hasButton: string,
  onClick: func,
  isAllCapsSubHeading: bool,
};

ItemHeadings.defaultProps = {
  heading: '',
  subHeading: '',
  hasDropDown: false,
  hasButton: '',
  onClick: () => {},
  isAllCapsSubHeading: false,
};

export default ItemHeadings;
