import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg';
import { ReactComponent as CalendarActiveIcon } from 'assets/icons/calendar-active.svg';
import { ReactComponent as CharityIcon } from 'assets/icons/charity.svg';
import { ReactComponent as CharityActiveIcon } from 'assets/icons/charity-active.svg';
import { ReactComponent as GlobeIcon } from 'assets/icons/globe.svg';
import { ReactComponent as GlobeActiveIcon } from 'assets/icons/globe-active.svg';
import { ReactComponent as PinIcon } from 'assets/icons/pin.svg';
import { ReactComponent as PinActiveIcon } from 'assets/icons/pin-active.svg';
import { ReactComponent as AccountIcon } from 'assets/icons/account.svg';
import { ReactComponent as AccountActiveIcon } from 'assets/icons/account-active.svg';

import styles from './Menu.module.scss';

const Menu = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const routes = [
    {
      to: '/overview',
      icon: <CalendarIcon className={styles.icon} />,
      iconActive: <CalendarActiveIcon className={styles.icon} />,
      label: t('menu.overview'),
    },
    {
      to: '/beneficiary',
      icon: <CharityIcon className={styles.icon} />,
      iconActive: <CharityActiveIcon className={styles.icon} />,
      label: t('menu.beneficiary'),
    },
    {
      to: '/',
      icon: <GlobeIcon className={clsx(styles.icon, styles.globe)} />,
      iconActive: (
        <GlobeActiveIcon className={clsx(styles.icon, styles.globe)} />
      ),
      label: t('menu.map'),
    },
    {
      to: '/locations',
      icon: <PinIcon className={styles.icon} />,
      iconActive: <PinActiveIcon className={styles.icon} />,
      label: t('menu.places'),
    },
    {
      to: '/profile',
      icon: <AccountIcon className={styles.icon} />,
      iconActive: <AccountActiveIcon className={styles.icon} />,
      label: t('menu.profile'),
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        {routes.map((r) => (
          <NavLink
            key={r.to}
            className={clsx(styles.menuItem, {
              [styles.isActive]: location.pathname === r.to,
            })}
            to={r.to}
          >
            {location.pathname === r.to ? r.iconActive : r.icon}
            <span>{r.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
export default Menu;
