import { string, func } from 'prop-types';
import { useContext } from 'react';

import { UserContext } from 'context/UserContext';

import SignOutIcon from 'assets/icons/signout.svg';

import styles from './UserSection.module.scss';

const UserSection = ({ onClick }) => {
  const { user, userTeam } = useContext(UserContext);

  return (
    <div className={styles.userWrapper}>
      <div className={styles.teamWrapper}>
        <div className={styles.teamLogo}>
          <img src={userTeam?.logo} alt={`${userTeam?.teamName} Logo`} />
        </div>
        <div className={styles.teamInfo}>
          <h4>{userTeam?.teamName}</h4>
          <p className={`goldenText`}>{user?.displayName}</p>
        </div>
      </div>
      <div
        className={styles.signOutIcon}
        style={{
          maskImage: `url(${SignOutIcon})`,
          WebkitMaskImage: `url(${SignOutIcon})`,
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
