import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import NewsItems from './NewsItems';
import Button from 'components/Button/Button';
import ItemHeadings from 'components/ItemHeadings/ItemHeadings';

import NewsIcon from 'assets/icons/news.svg';

import styles from './LatestNews.module.scss';
import fixUrl from 'utils/fix-url';
import Spinner from 'components/Spinner/Spinner';

// const staticNews = [
//   {
//     heading: 'Last minute design changes',
//     dateAndTime: '2023-03-25 16:46:12',
//     content:
//       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad officiis molestias ducimus minima reiciendis, ullam ex voluptatum suscipit ratione, iste repellat at maiores a atque nostrum eaque! Quasi, dolorem doloremque.',
//   },
//   {
//     heading: 'Some other news',
//     dateAndTime: '2023-03-21 07:22:57',
//     content:
//       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad officiis molestias ducimus minima reiciendis, ullam ex voluptatum suscipit ratione.',
//   },
//   {
//     heading: 'Some other news',
//     dateAndTime: '2023-03-21 07:22:55',
//     content:
//       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad officiis molestias ducimus minima reiciendis, ullam ex voluptatum suscipit ratione.',
//   },
// ];

const LatestNews = () => {
  const [news, setNews] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    const getNews = async () => {
      const response = await fetch(fixUrl('/news/newsfeed'));
      const apiData = await response.json();
      setNews(apiData);
    };
    getNews();
  }, []);

  return (
    <div className={styles.latestNewsWrapper}>
      <ItemHeadings
        heading={t('landing.world')}
        subHeading={t('landing.news')}
        isAllCapsSubHeading
      />
      <div className={styles.newsItemsWrapper}>
        {news.length > 0 ? (
          <NewsItems news={news} />
        ) : (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        )}
      </div>
      <div className={styles.moreNews}>
        <Button isSmall hasIcon={NewsIcon}>
          {t('landing.moreNews')}
        </Button>
      </div>
    </div>
  );
};

export default LatestNews;
