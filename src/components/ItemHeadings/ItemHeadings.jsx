import { string, bool } from 'prop-types';
import clsx from 'clsx';

import styles from './ItemHeadings.module.scss';

const ItemHeadings = ({
  heading,
  subHeading,
  hasDropDown,
  hasEdit,
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
      {hasEdit && <p className={styles.edit}>Edit</p>}
    </div>
  );
};

ItemHeadings.propTypes = {
  heading: string,
  subHeading: string,
  hasDropDown: bool,
  hasEdit: bool,
  isAllCapsSubHeading: bool,
};

ItemHeadings.defaultProps = {
  heading: '',
  subHeading: '',
  hasDropDown: false,
  hasEdit: false,
  isAllCapsSubHeading: false,
};

export default ItemHeadings;
