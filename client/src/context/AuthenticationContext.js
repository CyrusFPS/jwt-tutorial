import React, { useState, createContext } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};
