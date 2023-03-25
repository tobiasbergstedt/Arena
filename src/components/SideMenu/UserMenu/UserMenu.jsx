import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { array } from 'prop-types';

import userMenuItems from 'components/SideMenu/MenuItems/userMenuItems';

import styles from './UserMenu.module.scss';

const UserMenu = ({ slugs }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.userMenuWrapper}>
      {userMenuItems.map(({ url, linkTo }, index) => (
        <div
          key={url + index}
          className={clsx(styles.userMenuIconWrapper, {
            [styles.active]: linkTo === slugs[1],
          })}
          onClick={() => navigate(`/${linkTo}`)}
        >
          <div
            className={styles.iconInnerWrapper}
            style={{
              maskImage: url,
              WebkitMaskImage: url,
            }}
          />
        </div>
      ))}
    </div>
  );
};

UserMenu.propTypes = {
  slugs: array,
};

export default UserMenu;
