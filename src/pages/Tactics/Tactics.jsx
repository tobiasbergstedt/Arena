import ItemHeadings from 'components/ItemHeadings/ItemHeadings';
import Spinner from 'components/Spinner/Spinner';

import styles from './Tactics.module.scss';

const Tactics = () => {
  const gridItems = [
    {
      label: 'Field surface',
      value: 'Grass',
    },
    {
      label: 'Weather',
      value: 'Raining',
    },
    {
      label: 'Fright value',
      value: '12',
    },
    {
      label: 'Temperature',
      value: '12°C',
    },
    {
      label: 'Honor value',
      value: '0',
    },
    {
      label: 'Wind',
      value: '2 m/s',
    },
  ];

  return (
    <>
      {!true ? (
        <div className={styles.isLoading}>
          <Spinner />
        </div>
      ) : (
        <div className={styles.stadiumWrapper}>
          <ItemHeadings
            heading={'Arena for next game (Home)'}
            subHeading={'Basher Brothers Blood Dome'}
            isSmallSubheading
          />
          <div className={styles.stadiumGrid}>
            {gridItems.map(({ label, value }, index) => (
              <div className={styles.gridItem} key={(label, value, index)}>
                <p>{label}: </p>
                <p>{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Tactics;
