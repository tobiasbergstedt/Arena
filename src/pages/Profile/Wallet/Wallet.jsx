import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from 'context/UserContext';
import clsx from 'clsx';
import { USER_INFO } from 'components/ButtonsSection/NavButton/renderIcon';
import api from 'api/User';

import NavButton from 'components/ButtonsSection/NavButton/NavButton';

import { ReactComponent as GlobeIcon } from 'assets/icons/profile-icon-globe.svg';

import styles from './Wallet.module.scss';

const Wallet = () => {
  const { userBalance, setUserBalance } = useContext(UserContext);
  const { mutate: getUserBalance } = api.useUserBalance((data) => {
    setUserBalance(data);
  });
  const { t } = useTranslation();
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  useEffect(() => {
    getUserBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.header}>
        {t('profilePage.walletSection.myWallet')}
      </h4>
      <div className={styles.walletContent}>
        <div className={clsx(styles.section, styles.first)}>
          <div>
            <p className={clsx(styles.bold, styles.smallParagraph)}>
              {t('profilePage.walletSection.balance')}
            </p>
            <p className={clsx(styles.smallParagraph, styles.date)}>
              {`${day < 10 ? `0${day}` : day}-${
                month < 10 ? `0${month}` : month
              }-${year}`}
            </p>
          </div>
          <GlobeIcon className={styles.globeIcon} />
        </div>
        <div className={clsx(styles.section, styles.second)}>
          {userBalance && <h1>{`${userBalance.totalBalance} kr`}</h1>}
        </div>
      </div>
      <NavButton
        key={t('profilePage.walletSection.viewTransactions')}
        href={'edit-profile'}
        iconType={USER_INFO}
        label={t('profilePage.walletSection.viewTransactions')}
      />
    </div>
  );
};

export default Wallet;
