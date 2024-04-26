import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom'; 

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
    </div>
  );
}

export default NavBar;
