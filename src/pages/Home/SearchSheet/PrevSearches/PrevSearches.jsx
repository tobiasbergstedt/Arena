import { func } from 'prop-types';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Search from 'api/Search';

import SpinnerGlobe from 'components/SpinnerGlobe/SpinnerGlobe';
import PlaceItem from '../PlaceItem/PlaceItem';

import styles from './PrevSearches.module.scss';

const PrevSearches = ({ onSelected }) => {
  const { data, isSuccess, isLoading } = Search.useSearchHistory();

  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <span className={styles.header}>
        {t('homePage.searchSheet.previousSearches')}
      </span>
      {isLoading && <SpinnerGlobe className={styles.spinner} isSmall />}
      {isSuccess &&
        data.map((item, index) => {
          const { main_text, secondary_text, bounds } = item;
          return (
            item.bounds && (
              <PlaceItem
                main_text={main_text}
                secondary_text={secondary_text}
                bounds={bounds}
                savedSearch={true}
                key={index}
                onSelected={(value) => onSelected(value)}
                className={styles.placeItem}
              />
            )
          );
        })}
    </div>
  );
};

PrevSearches.propTypes = {
  onSelected: func,
};

PrevSearches.defaultProps = {
  onSelected: () => {},
};

export default PrevSearches;
