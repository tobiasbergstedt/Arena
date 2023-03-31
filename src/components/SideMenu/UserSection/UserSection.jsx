import { string, func } from 'prop-types';

import styles from './UserSection.module.scss';

const UserSection = ({ teamLogo, onClick }) => {
  return (
    <div className={styles.userWrapper}>
      <div className={styles.teamWrapper}>
        <div className={styles.teamLogo}>
          <div className={styles.teamLogoInnerWrapper}>
            <img src={teamLogo} alt="Behemot Bashers Logo" />
          </div>
        </div>
        <div className={styles.teamInfo}>
          <h4>Behemot Bashers</h4>
          <p className={`goldenText`}>robert76</p>
        </div>
      </div>
      <div
        className={styles.signOutIcon}
        style={{
          maskImage: 'url(assets/icons/signout.svg)',
          WebkitMaskImage: 'url(assets/icons/signout.svg)',
        }}
        onClick={onClick}
      />
    </div>
  );
};

UserSection.propTypes = {
  teamLogo: string,
  onClick: func,
};

export default UserSection;
