import { useEffect, useContext, useState } from 'react';
import { AppContext } from 'context/AppContext';
import Portal from 'modals/Portal/Portal';

import { ReactComponent as NotificationIcon } from 'assets/icons/notification-symbol.svg';

import styles from './UserNotifications.module.scss';

const UserNotifications = () => {
  // eslint-disable-next-line no-unused-vars
  const { userNotification, setUserNotification } = useContext(AppContext);
  const [displayNotification, setDisplayNotification] = useState(false);

  const revealMessage = (delay = 0) => {
    setTimeout(() => {
      setDisplayNotification(true);
    }, delay);
  };

  const removeMessage = (delay = 0, time = 3000) => {
    const combinedTime = time + delay;
    setTimeout(() => {
      setUserNotification(null);
      setDisplayNotification(false);
    }, combinedTime);
  };

  useEffect(() => {
    if (userNotification) {
      //  Delay before display
      revealMessage(userNotification?.delay);

      // Time before it closes
      removeMessage(userNotification?.delay, userNotification?.time);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userNotification]);

  if (!userNotification) {
    return null;
  }

  return (
    <Portal wrapperId="notifications-root">
      {displayNotification && (
        <div className={styles.wrapper}>
          <NotificationIcon className={styles.icon} />
          {userNotification?.message}
        </div>
      )}
    </Portal>
  );
};

export default UserNotifications;
