import React from 'react';
import { bool } from 'prop-types';

import routes from 'pages/Profile/profileRoutes';
import ButtonsSection from 'components/ButtonsSection/ButtonsSection';

import styles from './UserMenu.module.scss';

const UserMenu = ({ isLoggedIn }) => (
  <div className={styles.wrapper}>
    {routes.map((block) => {
      if (!isLoggedIn && block.needsAuthentication) {
        return null;
      }
      return (
        <ButtonsSection
          key={block.header}
          heading={block.header}
          items={block.subroutes}
        />
      );
    })}
  </div>
);

UserMenu.propTypes = {
  isLoggedIn: bool.isRequired,
};

export default UserMenu;
