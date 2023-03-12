import React, { createContext, useEffect, useRef, useState } from 'react';
import { node } from 'prop-types';
import { local } from 'utils/storage';
import { STORAGE_SKIPPED_INSTRUCTIONS } from 'config/constants';

let HomeContext;

const HomeProvider = ({ children }) => {
  // Fix for vite hot reload
  const refContext = useRef();
  HomeContext = refContext.current ??= createContext();
  const isFirstRender = useRef(true);

  const [displayCountdownClock, setDisplayCountdownClock] = useState(true);
  const [isZoomValidForSelectPlace, setZoomValidForSelectPlace] =
    useState(false);
  const [hasSkippedInstructions, setHasSkippedInstructions] = useState(
    local.read(STORAGE_SKIPPED_INSTRUCTIONS)
  );

  useEffect(() => {
    if (!isFirstRender.current) {
      if (hasSkippedInstructions) {
        local.write(STORAGE_SKIPPED_INSTRUCTIONS, hasSkippedInstructions);
      } else {
        local.destroy(STORAGE_SKIPPED_INSTRUCTIONS);
      }
    }
    isFirstRender.current = false;
  }, [hasSkippedInstructions]);

  return (
    <HomeContext.Provider
      value={{
        hasSkippedInstructions,
        setHasSkippedInstructions,
        displayCountdownClock,
        setDisplayCountdownClock,
        isZoomValidForSelectPlace,
        setZoomValidForSelectPlace,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

HomeProvider.propTypes = {
  children: node.isRequired,
};

export { HomeContext, HomeProvider };
