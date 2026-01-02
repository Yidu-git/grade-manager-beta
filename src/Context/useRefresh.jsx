import { createContext, useState, useContext, useDebugValue } from "react";

export const RefreshTokenContext = createContext("");
export const RefreshTokenProvider = ({ children }) => {
  const [refreshToken, setRefreshToken] = useState({});
  return (
    <RefreshTokenContext.Provider value={{ refreshToken, setRefreshToken }}>
      {children}
    </RefreshTokenContext.Provider>
  );
};

export const useRefresh = () => {
  const { auth } = useContext(RefreshTokenContext);
  return useContext(RefreshTokenContext);
};
