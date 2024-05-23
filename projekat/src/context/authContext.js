import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data);
    return res.data;
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:8800/api/auth/logout", {}, {
        withCredentials: true
      });
      setCurrentUser(null); //čistimo currentUser state
      localStorage.removeItem("user"); //čistimo ga iz local storage
    } catch (error) {
      console.error("Greška u logout-u:", error);
    }
  };

  //DA BI SE AŽURIRALI PODACI SVUDA KADA AŽURIRAMO PROFIL, a ne da se čuva currentUser samo kad se ulogujemo
  const updateUser = async (inputs) => {
    const res = await axios.put("http://localhost:8800/api/home-page/users", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data);
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
