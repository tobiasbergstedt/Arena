import React, { createContext, useRef, useState } from 'react';
import { node } from 'prop-types';

let ModalContext;

const ModalProvider = ({ children }) => {
  // Fix for vite hot reload
  const refContext = useRef();
  ModalContext = refContext.current ??= createContext();

  const [currentModal, setCurrentModal] = useState();

  return (
    <ModalContext.Provider value={{ currentModal, setCurrentModal }}>
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: node.isRequired,
};

export { ModalContext, ModalProvider };
