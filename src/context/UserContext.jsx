import React, { createContext, useEffect, useRef, useState } from 'react';
import { node } from 'prop-types';
import userApi from 'api/User';
import { session, local } from 'utils/storage';
import {
  STORAGE_USER_TOKEN_KEY,
  RECURRING_PANGEO_USER,
} from 'config/constants';

let UserContext;

const UserProvider = ({ children }) => {
  // Fix for vite hot reload
  const refContext = useRef();
  UserContext = refContext.current ??= createContext();
  const isFirstRender = useRef(true);

  const [isLoggedIn, setIsLoggedIn] = useState(
    session.read(STORAGE_USER_TOKEN_KEY) !== null
  );
  const [userToken, setUserToken] = useState(
    session.read(STORAGE_USER_TOKEN_KEY)
  );
  const [userId, setUserId] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [mobilePhoneNo, setMobilePhoneNo] = useState(null);
  const [userName, setUserName] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [pep, setPep] = useState(null);
  const [newUserAccount, setNewUserAccount] = useState(null);
  const [accountRestrictionsCompleted, setAccountRestrictionsCompleted] =
    useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const recurringUser = local.read(RECURRING_PANGEO_USER);

  const { mutate: getUserData } = userApi.useUserData((data) => {
    setUserData(data);
  });

  useEffect(() => {
    if (!isFirstRender.current) {
      if (userToken) {
        session.write(STORAGE_USER_TOKEN_KEY, userToken);
        /**
         * If user has token, but userData(userId) is empty, then fetch userData.
         */
        if (!userId) {
          getUserData();
        }
        setIsLoggedIn(true);
      } else {
        session.destroy(STORAGE_USER_TOKEN_KEY);
        setIsLoggedIn(false);
      }
    }
    isFirstRender.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);

  const logoutUser = () => {
    setUserToken(null);
  };

  function setUserData(data) {
    setUserId(data.userId);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setMobilePhoneNo(data.mobilePhoneNo);
    setUserName(data.userName);
    setProfileImageUrl(data.profileImageUrl);
    setPep(data.pep);
    setNewUserAccount(data.newUserAccount);
    setAccountRestrictionsCompleted(data.accountRestrictionsCompleted);
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setUserToken,
        logoutUser,
        setUserData,
        userId,
        setUserId,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        mobilePhoneNo,
        setMobilePhoneNo,
        userName,
        setUserName,
        profileImageUrl,
        setProfileImageUrl,
        pep,
        setPep,
        newUserAccount,
        setNewUserAccount,
        accountRestrictionsCompleted,
        setAccountRestrictionsCompleted,
        userBalance,
        setUserBalance,
        recurringUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: node.isRequired,
};

export { UserContext, UserProvider };
