import styles from './Copyright.module.scss';

const Copyright = () => {
  return (
    <p className={styles.copyRight}>
      Copyright <span className={styles.golden}>©</span> 2023, Tobias Bergstedt
    </p>
  );
};

export default Copyright;
