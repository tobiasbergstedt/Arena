import { useTranslation } from 'react-i18next';
import { arrayOf, object } from 'prop-types';

import Button from 'components/Button/Button';

import styles from './NewsItems.module.scss';

const NewsItems = ({ news }) => {
  const { t } = useTranslation();

  return (
    <>
      {news &&
        news.slice(0, 2).map(({ heading, dateAndTime, summary }) => (
          <div className={styles.newsItem} key={heading + summary}>
            <h3 className={styles.newsItemHeading}>{heading}</h3>
            <p className={styles.dateAndTime}>
              {new Date(dateAndTime.seconds * 1000).toLocaleString('sv-SE')}
            </p>
            {summary.slice(0, 2).map((element) => (
              <p key={element} className={styles.newsItemContent}>
                {element}
              </p>
            ))}
            <Button isSmall isSecondary>
              {t('landing.readMore')}
            </Button>
          </div>
        ))}
    </>
  );
};

NewsItems.propTypes = {
  news: arrayOf(object),
};

export default NewsItems;
