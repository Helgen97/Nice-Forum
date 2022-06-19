import React, {
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";

const AuthContext = createContext({
  isAuth: null,
  currentUser: null,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuth, setAuth] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setAuth(sessionStorage.getItem("isAuth"));
    setCurrentUser(JSON.parse(sessionStorage.getItem("currentUser")));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
