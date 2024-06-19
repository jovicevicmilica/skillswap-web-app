import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom'; 
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';

function NavBar() {
  //NAVBAR NA POČETNOJ STRANICI, PRIJE LOGOVANJA
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => { //otvaranje i zatvaranje hamburgera za mobilne uređaje, na klik ga otvorimo/zatvorimo
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => { //da lakše zatvorimo hamburger klikom pored njega
    const closeDropdown = (e) => {
      if (!e.target.closest('.nav-about')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', closeDropdown); //ako je menu otvoren, dodamo da se na klik zatvara
    }

    return () => {
      document.removeEventListener('click', closeDropdown); //inače mičemo taj event listener
    };
  }, [isMenuOpen]);

  return (
    <div className="nav-about">
      <div className="nav-inner">
        <Link to="/" className="navbar-logo-link"><div className="navbar-logo"/></Link>
        <div className="nav-links-wrapper">
          <Link to="/contact" className="nav-link">Kontakt</Link>
          <div className="right-side">
            <Link to="/login" className="nav-link login">Prijavi se</Link>
            <Link to="/register" className="blue-button"><button className="nav-button">Registruj se</button></Link>
          </div>
        </div>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <MenuTwoToneIcon className="icon-color-blue nav-menu"/>
      </div>
      {isMenuOpen && (
        <div className="navbar-dropdown-menu"> {/*ako je otvoren dropdown hamburger - a, prikažemo ga*/}
          <Link to="/contact" className="navbar-dropdown-link" onClick={toggleMenu}>Kontakt</Link>
          <Link to="/login" className="navbar-dropdown-link" onClick={toggleMenu}>Prijavi se</Link>
          <Link to="/register" className="navbar-dropdown-link" onClick={toggleMenu}>Registruj se</Link>
        </div>
      )}
    </div>
  );
}

export default NavBar;
