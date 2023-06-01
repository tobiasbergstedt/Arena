import { useContext, useState, useEffect, Fragment } from 'react';
import { string, array, arrayOf } from 'prop-types';

import { UserContext } from 'context/UserContext';
import convertPosition from 'utils/convert-position';

import ItemHeadings from 'components/ItemHeadings/ItemHeadings';

import styles from './History.module.scss';

const History = ({
  historyArray,
  heading,
  subHeading,
  labels,
  values,
  convertComparison,
  noHistory,
}) => {
  const { userTeam } = useContext(UserContext);
  const [reversedHistoryArray, setReversedHistoryArray] = useState([]);

  useEffect(() => {
    const reversedHistory = [...historyArray].reverse();
    setReversedHistoryArray(reversedHistory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.teamHistory}>
      <ItemHeadings heading={heading} subHeading={subHeading} />
      <div
        className={styles.historyGrid}
        style={{
          gridTemplateColumns: `repeat(${values.length}, auto)`,
        }}
      >
        {labels.map((label) => (
          <p className={styles.statsLabel} key={label}>
            {label}
          </p>
        ))}
        {userTeam.teamHistory.length > 0 && (
          <>
            {reversedHistoryArray.map((historyObject, index) => (
              <Fragment key={(historyObject[values[index]], index)}>
                {values.map((value, i) => (
                  <p key={i}>
                    {convertComparison.includes(value)
                      ? convertPosition(historyObject[value.toLowerCase()])
                      : historyObject[value.toLowerCase()]}
                  </p>
                ))}
              </Fragment>
            ))}
          </>
        )}
      </div>
      {(!userTeam.teamHistory || userTeam.teamHistory.length === 0) && (
        <p className={styles.noHistoryGrid}>
          {userTeam.teamName} {noHistory}
        </p>
      )}
    </div>
  );
};

History.propTypes = {
  historyArray: array,
  heading: string,
  subHeading: string,
  labels: arrayOf(string),
  values: arrayOf(string),
  convertComparison: arrayOf(string),
  noHistory: string,
};

History.defaultProps = {
  historyArray: [],
  heading: '',
  subHeading: '',
  labels: [''],
  values: [''],
  convertComparison: [''],
  noHistory: '',
};

export default History;
