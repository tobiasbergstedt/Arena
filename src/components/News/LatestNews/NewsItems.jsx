import { arrayOf, object } from 'prop-types';

import Button from 'components/Button/Button';

import styles from './NewsItems.module.scss';

const NewsItems = ({ news }) => {
  return (
    <>
      {news.map(({ heading, dateAndTime, content }) => (
        <div className={styles.newsItem} key={dateAndTime}>
          <h3 className={styles.newsItemHeading}>{heading}</h3>
          <p className={styles.dateAndTime}>{dateAndTime}</p>
          <p className={styles.newsItemContent}>{content}</p>
          <Button isSmall isSecondary>
            Read more
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
