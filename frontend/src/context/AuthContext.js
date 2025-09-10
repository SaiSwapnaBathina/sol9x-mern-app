import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("sol9x_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (data) => {
    localStorage.setItem("sol9x_user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("sol9x_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
