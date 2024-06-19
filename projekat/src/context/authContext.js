import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(); //pravimo context za autentifikaciju preko opcija iz react - a 
//ovaj context omogućava komponentama aplikacije da dijele kontekst autentifikacije, i stanje prijave

export const AuthContextProvider = ({ children }) => { //obezbjeđuje ovim funkcijama svu djecu, tj. sve komponente kojima su potrebne
  const [currentUser, setCurrentUser] = useState(() => { //trenutni korisnik se postavlja na korisnika iz lokalnog storage - a, ako ga ima, inače na null
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const login = async (inputs) => { //primamo korisničke podatke i šaljemo POST zahtjev, i odgovor nam je currentUser
    const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
      withCredentials: true,
    });

    setCurrentUser(res.data);
    return res.data;
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:8800/api/auth/logout", {}, { //šaljemo zahtjev na logout endpoint
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
    const res = await axios.put("http://localhost:8800/api/home-page/users", inputs, { //ažuriramo korisnika na osnovu promjena svugdje na profilu
      withCredentials: true,
    });

    setCurrentUser(res.data);
  };

  useEffect(() => { //ovo se poziva kada se korisnik promijeni, tj. currentUser
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser)); //smještamo ga u local storage kao string
    } else {
      localStorage.removeItem("user"); //inače ga mičemo
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateUser }}> {/*obavijamo djecu i pružamo im pristup svim gore navedenim funkcijama*/}
      {children}
    </AuthContext.Provider>
  );
};
