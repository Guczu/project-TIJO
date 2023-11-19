import React, { createContext, useContext, useState } from 'react';

const ErrorContext = createContext();

export const useError = () => {
  return useContext(ErrorContext);
};

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null)

  const showError = (errorMessage) => {
    setError(errorMessage);
  };

  const hideError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, showError, hideError }}>
      {children}
    </ErrorContext.Provider>
  );
};
