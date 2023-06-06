import { array, func } from 'prop-types';
import { useTranslation } from 'react-i18next';

import ItemHeadings from 'components/ItemHeadings/ItemHeadings';

import styles from './ArtefactsResult.module.scss';
import ArtefactTemplate from 'components/ArtefactTemplate/ArtefactTemplate';

const ArtefactsResult = ({ searchResultArtefact, setSearchResultArtefact }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.headings}>
        <ItemHeadings
          heading={t('marketplace.heading')}
          subHeading={`${searchResultArtefact.length} ${
            searchResultArtefact.length > 1
              ? t('marketplace.results')
              : searchResultArtefact.length === 0
              ? t('marketplace.results')
              : t('marketplace.result')
          }`}
          hasButton={t('general.return')}
          onClick={() => setSearchResultArtefact([])}
        />
        <p className={styles.playerResultsDescription}>
          {t('marketplace.resultDescriptionArtefacts')}
        </p>
        <p className={styles.amountDisplayed}>
          ({t('marketplace.displaying')} 1-
          {searchResultArtefact?.length <= 9
            ? searchResultArtefact.length
            : '10'}
          )
        </p>
      </div>
      {searchResultArtefact.map(({ id, type, endDate, bid, bidder }, index) => (
        <ArtefactTemplate
          key={id}
          id={id}
          type={type}
          endDate={endDate}
          bid={bid}
          bidder={bidder}
          index={index}
          searchResultArtefact={searchResultArtefact}
        />
      ))}
    </>
  );
};

ArtefactsResult.propTypes = {
  searchResultArtefact: array,
  setSearchResultArtefact: func,
};

export default ArtefactsResult;
