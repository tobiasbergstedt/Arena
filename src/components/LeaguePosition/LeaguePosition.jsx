import styles from './LeaguePosition.module.scss';

const LeaguePosition = () => {
  return (
    <div className={styles.leaguePositionWrapper}>
      <div className={`goldenText`}>League position</div>
      <span className={styles.topHeading}>Division 1</span>
      <p className={styles.leagueName}>Berunia</p>
      <div className={styles.leaguePosition}>
        <span className={styles.position}>#1</span>
        <table className={styles.statistics}>
          <tbody>
            <tr>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>+/-</th>
              <th>P</th>
            </tr>
            <tr>
              <td>11</td>
              <td>0</td>
              <td>0</td>
              <td>22</td>
              <td>22</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaguePosition;
