import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ userData,children }) => {
  
  const [auth, setAuth] = useState(userData);
  console.log("auth inside provider",auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
