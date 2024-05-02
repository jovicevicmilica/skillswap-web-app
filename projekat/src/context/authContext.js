import { createContext, useEffect, useState } from "react";
import axios from "axios";

//za pronalaženje trenutnog korisnika našeg sajta
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post("http://localhost:8800/api/auth/login", inputs, { /*mora await da nam user ne bi postao undefined, čekamo na axios*/
      withCredentials: true,
    });

    setCurrentUser(res.data);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser)); /*pretvaramo u string, jer ne možemo objekat smjestiti u local storage*/
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};