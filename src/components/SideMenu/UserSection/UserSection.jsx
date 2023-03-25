import { useNavigate } from 'react-router-dom';
import { string } from 'prop-types';

import styles from './UserSection.module.scss';

const UserSection = ({ teamLogo }) => {
  const navigate = useNavigate();
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
          <p className={styles.golden}>robert76</p>
        </div>
      </div>
      <div
        className={styles.signOutIcon}
        style={{
          maskImage: 'url(assets/icons/signout.svg)',
          WebkitMaskImage: 'url(assets/icons/signout.svg)',
        }}
        onClick={() => {
          navigate('/');
        }}
      />
    </div>
  );
};

UserSection.propTypes = {
  teamLogo: string,
};

export default UserSection;
