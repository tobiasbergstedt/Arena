/* eslint-disable react/prop-types */
import { func } from 'prop-types';
import { forwardRef, useRef, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { components } from 'react-google-places-autocomplete/node_modules/react-select';
import { useTranslation } from 'react-i18next';

import { GOOGLE_PLACES_API_KEY } from 'config/settings';

import Search from 'api/Search';
import useGetGeocode from '../useGetGeocode';
import useBreakpoint, { MOBILE } from 'hooks/useBreakpoint';

import { ReactComponent as ClearIcon } from 'assets/icons/input-clear.svg';

import Portal from 'modals/Portal/Portal';
import BottomSheet from 'modals/BottomSheet/BottomSheet';
import ScrollContainer from 'modals/BottomSheet/ScrollContainer/ScrollContainer';
import Header from 'modals/BottomSheet/Header/Header';
import Body from 'modals/BottomSheet/Body/Body';
import PlaceItem from './PlaceItem/PlaceItem';
import PrevSearches from './PrevSearches/PrevSearches';

import styles from './SearchSheet.module.scss';

const SearchSheet = forwardRef(({ onBoundsSelected }, ref) => {
  const { Option } = components;

  const locationRef = useRef(null);

  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === MOBILE;

  const [isVisible, setIsVisible] = useState(false);
  const [newValue, setNewValue] = useState(null);

  const { mutate: saveSearchHistory } = Search.useSaveSearchHistory(() => {});

  const [setPlaceData] = useGetGeocode((placeData) => {
    onBoundsSelected(placeData.bounds);
    saveSearchHistory(placeData);
  });

  const onClear = () => {
    setNewValue(null);
    locationRef.current.focus();
  };

  const DropdownIndicator = () => {
    return null;
  };
  const IndicatorSeparator = () => {
    return null;
  };

  const { t } = useTranslation();

  const colorGrey6 = '#f3f3f3';
  const colorGrey = '#f4f4f5';
  const colorBlue = '#00afc2';

  const controlStyle = (provided, state) => {
    return {
      ...provided,
      caretColor: `${colorBlue}`,
      backgroundColor: `${colorGrey}`,
      border: state.isSelected
        ? `1px solid ${colorBlue}`
        : `1px solid ${colorGrey6}`,
      boxShadow: state.isSelected
        ? `0 0 0 1px ${colorBlue}`
        : `0 0 0 1px ${colorGrey6}`,
      borderRadius: '8px',
      ':hover': {
        border: `1px solid ${colorBlue}`,
      },
      height: '48px',
      paddingLeft: '10px',
      paddingRight: '10px',
      margin: isMobile ? '0 20px' : '0 40px',
    };
  };

  const placeholderStyle = (provided) => {
    return {
      ...provided,
      fontSize: '18px',
    };
  };

  const optionStyle = (provided, state) => {
    return {
      ...provided,
      padding: '0 0 0 17px',
      backgroundColor: state.isSelected ? colorGrey6 : 'white',
      ':hover': {
        backgroundColor: colorGrey6,
      },
      height: '64px',
    };
  };

  const menuStyle = (provided) => {
    return {
      ...provided,
      width: '100%',
      margin: '0',
      borderRadius: '0px',
      boxShadow: 'none',
      backgroundColor: 'transparent',
    };
  };

  const menuListStyle = (provided) => {
    return {
      ...provided,
      margin: isMobile ? '0 20px' : '0 40px',
      padding: '0',
      height: '100%',
      boxShadow: '0px 24px 32px rgba(0, 0, 0, 0.11)',
      borderRadius: '8px',
    };
  };

  const loadingStyle = (provided) => {
    return {
      ...provided,
      marginRight: '30px',
    };
  };

  const OptionItem = (props) => (
    <Option {...props}>
      <PlaceItem
        main_text={props.data.value.structured_formatting.main_text}
        secondary_text={props.data.value.structured_formatting.secondary_text}
      />
    </Option>
  );

  return (
    <Portal wrapperId="bottom-sheet-root">
      <BottomSheet
        ref={ref}
        onShow={() => {
          setIsVisible(true);
        }}
        isVisible={isVisible}
        onHideComplete={() => {
          console.log('hideComplete');
        }}
      >
        <ScrollContainer>
          <Header
            label={t('homePage.searchSheet.label')}
            onCloseClick={() => {
              ref.current.close();
              setIsVisible(false);
            }}
          />
          <Body>
            <GooglePlacesAutocomplete
              apiKey={GOOGLE_PLACES_API_KEY}
              apiOptions={{ language: t('global.countryAbbr') }}
              selectProps={{
                ref: locationRef,
                placeholder: t('homePage.searchSheet.placeholder'),
                onChange: (data) => {
                  setPlaceData(data.value);
                },
                onFocus: () => setNewValue(null),
                value: newValue,
                noOptionsMessage: () => t('homePage.searchSheet.noResults'),
                components: {
                  DropdownIndicator,
                  IndicatorSeparator,
                  Option: OptionItem,
                },
                styles: {
                  control: (provided, state) => controlStyle(provided, state),
                  input: (provided) => ({
                    ...provided,
                  }),
                  placeholder: (provided) => placeholderStyle(provided),
                  singleValue: (provided) => ({
                    ...provided,
                  }),
                  option: (provided, state) => optionStyle(provided, state),
                  menu: (provided) => menuStyle(provided),
                  menuList: (provided) => menuListStyle(provided),
                  loadingIndicator: (provided) => loadingStyle(provided),
                },
              }}
            />
            <ClearIcon
              className={styles.clearInput}
              onClick={() => onClear()}
            />
            {isVisible && (
              <PrevSearches
                onSelected={(bounds) => {
                  onBoundsSelected(bounds);
                }}
              />
            )}
          </Body>
        </ScrollContainer>
      </BottomSheet>
    </Portal>
  );
});

SearchSheet.propTypes = {
  onBoundsSelected: func,
};

SearchSheet.defaultProps = {
  onBoundsSelected: null,
};

export default SearchSheet;
