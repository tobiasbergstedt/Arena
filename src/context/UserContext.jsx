import React, { createContext, useEffect, useRef, useState } from 'react';
import { node } from 'prop-types';
import { session } from 'utils/storage';

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from 'api/firebase';

import {
  STORAGE_USERTEAM_DATA,
  FIREBASE_USER_TOKEN_KEY,
  ARENA_SAVED_ATTRIBUTES,
} from 'config/constants';
import fixUrl from 'utils/fix-url';

let UserContext;

const UserProvider = ({ children }) => {
  // Fix for vite hot reload
  const refContext = useRef();
  UserContext = refContext.current ??= createContext();

  const [user, setUser] = useState(session.read(FIREBASE_USER_TOKEN_KEY));
  const [userTeam, setUserTeam] = useState(session.read(STORAGE_USERTEAM_DATA));
  const [savedAttributes, setSavedAttributes] = useState(() => {
    const storageItem = localStorage.getItem(ARENA_SAVED_ATTRIBUTES);
    return JSON.parse(storageItem);
  });

  const getUserTeam = async () => {
    const response = await fetch(fixUrl('/teams'));
    const apiData = await response.json();
    const matchingUser = apiData.find((team) => team.userUID === user.uid);
    setUserTeam(matchingUser);
    session.write(STORAGE_USERTEAM_DATA, matchingUser);
  };

  useEffect(() => {
    async function getData() {
      if (user) {
        getUserTeam();
      }
    }
    getData();
  }, [user]);

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    session.destroy(STORAGE_USERTEAM_DATA);
    session.destroy(FIREBASE_USER_TOKEN_KEY);
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

  return (
    <UserContext.Provider
      value={{
        user,
        userTeam,
        getUserTeam,
        signin,
        logout,
        savedAttributes,
        setSavedAttributes,
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
