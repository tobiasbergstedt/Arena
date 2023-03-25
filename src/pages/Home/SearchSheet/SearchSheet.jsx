/* eslint-disable react/prop-types */
import { func } from 'prop-types';
import { forwardRef, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ClearIcon } from 'assets/icons/input-clear.svg';

import Portal from 'modals/Portal/Portal';
import BottomSheet from 'modals/BottomSheet/BottomSheet';
import ScrollContainer from 'modals/BottomSheet/ScrollContainer/ScrollContainer';
import Header from 'modals/BottomSheet/Header/Header';
import Body from 'modals/BottomSheet/Body/Body';
import PrevSearches from './PrevSearches/PrevSearches';

import styles from './SearchSheet.module.scss';

const SearchSheet = forwardRef(({ onBoundsSelected }, ref) => {
  const locationRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [newValue, setNewValue] = useState(null);

  const onClear = () => {
    setNewValue(null);
    locationRef.current.focus();
  };

  const { t } = useTranslation();

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
