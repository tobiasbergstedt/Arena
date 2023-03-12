import React, { createContext, useRef, useState } from 'react';
import { node } from 'prop-types';

let EditContext;

const EditProvider = ({ children }) => {
  const refContext = useRef();
  EditContext = refContext.current ??= createContext();

  const [isInputAlertVisible, setIsInputAlertVisible] = useState(false);
  const [navigationTarget, setNavigationTarget] = useState('');
  const [step, setStep] = useState(1);

  return (
    <EditContext.Provider
      value={{
        isInputAlertVisible,
        setIsInputAlertVisible,
        navigationTarget,
        setNavigationTarget,
        step,
        setStep,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};

EditProvider.propTypes = {
  children: node.isRequired,
};

export { EditContext, EditProvider };
