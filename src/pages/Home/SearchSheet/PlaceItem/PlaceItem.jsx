import { string, bool, arrayOf, number, func } from 'prop-types';
import { truncateString } from 'utils/helpers';
import { clsx } from 'clsx';

import { ReactComponent as SearchIcon } from 'assets/icons/search-location.svg';
import { ReactComponent as SavedSearchIcon } from 'assets/icons/saved-search.svg';

import styles from './PlaceItem.module.scss';

const PlaceItem = ({
  main_text,
  secondary_text,
  savedSearch,
  bounds,
  onSelected,
  className,
}) => {
  const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children;

  return (
    <ConditionalWrapper
      condition={savedSearch}
      wrapper={(children) => (
        <button
          className={styles.button}
          type="button"
          onClick={() => {
            onSelected(bounds);
          }}
        >
          {children}
        </button>
      )}
    >
      <div className={clsx(styles.wrapper, className)}>
        {savedSearch ? (
          <SavedSearchIcon className={styles.icon} />
        ) : (
          <SearchIcon className={styles.icon} />
        )}
        <div className={styles.labelWrapper}>
          <span className={styles.header}>{truncateString(main_text, 30)}</span>
          <span className={styles.subHeader}>
            {truncateString(secondary_text, 30)}
          </span>
        </div>
      </div>
    </ConditionalWrapper>
  );
};

PlaceItem.propTypes = {
  savedSearch: bool,
  main_text: string,
  secondary_text: string,
  bounds: arrayOf(arrayOf(number)),
  onSelected: func,
  className: string,
};

PlaceItem.defaultProps = {
  main_text: '',
  secondary_text: '',
  savedSearch: false,
  bounds: null,
  onSelected: () => {},
  className: null,
};

export default PlaceItem;
