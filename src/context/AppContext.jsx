import React, { createContext, useRef, useState } from 'react';
import { node } from 'prop-types';
import { session } from 'utils/storage';

import {
  STORAGE_CONFIG_DATA_KEY,
  STORAGE_NEXT_SHOW_DATA_KEY,
} from 'config/constants';

let AppContext;

const AppProvider = ({ children }) => {
  // Fix for vite hot reload
  const refContext = useRef();
  AppContext = refContext.current ??= createContext();

  const [appConfig, setAppConfig] = useState(
    session.read(STORAGE_CONFIG_DATA_KEY)
  );
  const [activePlaces, setActivePlaces] = useState();
  const [nextShowData, setNextShowData] = useState(
    session.read(STORAGE_NEXT_SHOW_DATA_KEY)
  );

  const [userNotification, setUserNotification] = useState(null);

  return (
    <AppContext.Provider
      value={{
        appConfig,
        setAppConfig,
        activePlaces,
        setActivePlaces,
        nextShowData,
        setNextShowData,
        userNotification,
        setUserNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: node.isRequired,
};

export { AppContext, AppProvider };
