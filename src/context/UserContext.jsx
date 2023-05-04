import React, { createContext, useEffect, useRef, useState } from 'react';
import { node } from 'prop-types';
// import userApi from 'api/User';
import { session, local } from 'utils/storage';

import {
  // createUserWithEmailAndPassword,
  // sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  // updateProfile,
} from 'firebase/auth';
import { auth } from 'api/firebase';

import {
  STORAGE_USER_TOKEN_KEY,
  STORAGE_USERTEAM_DATA,
  RECURRING_PANGEO_USER,
  FIREBASE_USER_TOKEN_KEY,
} from 'config/constants';
import fixUrl from 'utils/fix-url';

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

  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(session.read(FIREBASE_USER_TOKEN_KEY));

  // const { mutate: getUserData } = userApi.useUserData((data) => {
  //   setUserData(data);
  // });

  // const createUser = (email, password, userName) => {
  //   createUserWithEmailAndPassword(auth, email, password);
  //   sendEmailVerification(auth.currentUser);
  //   updateProfile(auth.currentUser, { displayName: userName });
  // };
  // console.log(user.uid);

  const [userTeam, setUserTeam] = useState(session.read(STORAGE_USERTEAM_DATA));
  useEffect(() => {
    async function getData() {
      const response = await fetch(fixUrl('/teams'));
      const apiData = await response.json();
      const matchingUser = apiData.find((team) => team.userUID === user.uid);
      setUserTeam(matchingUser);
      session.write(STORAGE_USERTEAM_DATA, matchingUser);
      // updateProfile(auth.currentUser, {
      //   displayName: 'taraki',
      // });
    }
    getData();
  }, []);

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      session.write(FIREBASE_USER_TOKEN_KEY, currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isFirstRender.current) {
      if (userToken) {
        session.write(STORAGE_USER_TOKEN_KEY, userToken);
        /**
         * If user has token, but userData(userId) is empty, then fetch userData.
         */
        // if (!userId) {
        //   getUserData();
        // }
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
        user,
        // createUser,
        userTeam,
        signin,
        logout,
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
