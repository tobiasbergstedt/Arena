import NewsItems from './NewsItems';
import Button from 'components/Button/Button';

import NewsIcon from 'assets/icons/news.svg';

import styles from './LatestNews.module.scss';

const news = [
  {
    heading: 'Last minute design changes',
    dateAndTime: '2023-03-25 16:46:12',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad officiis molestias ducimus minima reiciendis, ullam ex voluptatum suscipit ratione, iste repellat at maiores a atque nostrum eaque! Quasi, dolorem doloremque.',
  },
  {
    heading: 'Some other news',
    dateAndTime: '2023-03-21 07:22:57',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad officiis molestias ducimus minima reiciendis, ullam ex voluptatum suscipit ratione.',
  },
  {
    heading: 'Some other news',
    dateAndTime: '2023-03-21 07:22:55',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad officiis molestias ducimus minima reiciendis, ullam ex voluptatum suscipit ratione.',
  },
];

const LatestNews = () => {
  return (
    <div className={styles.latestNewsWrapper}>
      <div className={`goldenText`}>World</div>
      <span className={styles.topHeading}>NEWS</span>
      <div className={styles.newsItemsWrapper}>
        <NewsItems news={news} />
      </div>
      <div className={styles.moreNews}>
        <Button isSmall hasIcon={NewsIcon}>
          More News
        </Button>
      </div>
    </div>
  );
};

export default LatestNews;
