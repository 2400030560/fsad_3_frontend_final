// src/context/AuthContext.js
import React, { createContext, useContext, useState } from "react";
import { adminCredentials, studentCredentials } from "../data/mockData";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  const loginStudent = (email, password) => {
    const found = studentCredentials.find(
      (s) => s.email === email && s.password === password
    );
    if (found) {
      const { password, ...rest } = found;
      const userObj = { ...rest, role: "student" };
      setUser(userObj);
      try {
        localStorage.setItem("user", JSON.stringify(userObj));
      } catch (e) {
        // ignore storage errors
      }
      return true;
    }
    return false;
  };

  const loginAdmin = (email, password) => {
    if (
      email === adminCredentials.email &&
      password === adminCredentials.password
    ) {
      const userObj = { email, role: "admin", name: "Administrator" };
      setUser(userObj);
      try {
        localStorage.setItem("user", JSON.stringify(userObj));
      } catch (e) {
        // ignore storage errors
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("user");
    } catch (e) {
      // ignore
    }
  };

  return (
    <AuthContext.Provider value={{ user, loginStudent, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
