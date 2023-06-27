import { useState } from 'react';
// import { useTranslation } from 'react-i18next';

import ItemHeadings from 'components/ItemHeadings/ItemHeadings';
import Spinner from 'components/Spinner/Spinner';
import Tabs from 'components/Tabs/Tabs';
import Lineup from './Lineup/Lineup';

import styles from './Tactics.module.scss';

const Tactics = () => {
  // const { t } = useTranslation();
  const [isSelected, setIsSelected] = useState(0);

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
        <>
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
          <Tabs
            isSelected={isSelected}
            setIsSelected={setIsSelected}
            tab1={<Lineup />}
            tab2={<div>då</div>}
            tabLabel1="Hejsan"
            tabLabel2="Svejsan"
          />
        </>
      )}
    </>
  );
};

export default Tactics;
