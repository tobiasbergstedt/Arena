import { clsx } from 'clsx';
import { bool, func, string } from 'prop-types';

import { ReactComponent as ChatIcon } from 'assets/icons/chat.svg';

import styles from './MenuBar.module.scss';

const MenuBar = ({
  isSideMenuOpen,
  setIsSideMenuOpen,
  isChatOpen,
  setIsChatOpen,
  title,
}) => {
  return (
    <div className={styles.menuWrapper}>
      <div className={styles.iconWrapper}>
        <div
          onClick={() => {
            setIsSideMenuOpen(!isSideMenuOpen);
          }}
          className={clsx(styles.menuIcon, {
            [styles.open]: isSideMenuOpen,
          })}
        >
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <h2>{title}</h2>
      <div className={styles.iconWrapper}>
        <ChatIcon
          className={styles.chatIcon}
          onClick={() => {
            setIsChatOpen(!isChatOpen);
          }}
        />
      </div>
    </div>
  );
};

MenuBar.propTypes = {
  title: string.isRequired,
  isSideMenuOpen: bool,
  setIsSideMenuOpen: func,
  isChatOpen: bool,
  setIsChatOpen: func,
};

MenuBar.defaultProps = {
  isSideMenuOpen: false,
  setIsSideMenuOpen: () => {},
  isChatOpen: false,
  setIsChatOpen: () => {},
};

export default MenuBar;
