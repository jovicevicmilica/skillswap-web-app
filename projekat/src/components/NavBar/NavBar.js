import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom'; 
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';

function NavBar() {
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
      <div className="hamburger">
        <MenuTwoToneIcon className="icon-color-blue"/>
      </div>
    </div>
  );
}

export default NavBar;
