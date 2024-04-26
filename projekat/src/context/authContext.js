import { createContext, useEffect, useState } from "react";
 
//za pronalaženje trenutnog korisnika našeg sajta
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = () => {
    //privremena funkcija prije backend - a
    setCurrentUser({id: 1, name:"Milica Jovićević", profilePicture:"https://www.shutterstock.com/image-photo/smiling-businesswoman-looking-camera-webcam-600nw-1302585136.jpg"})
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