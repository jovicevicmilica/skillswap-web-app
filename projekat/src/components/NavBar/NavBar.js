import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom'; 
import logo from '../../images/logofinal.png'; //slika logo - a

function NavBar() {
  return (
    <nav>
      <div className="logo-and-search">
        <Link to="/" className="navbar-logo-link"><img src={logo} alt="Logo" className="navbar-logo"/></Link>
        <div className="dropdown">
          <button className="dropbtn">Pretraži</button>
          <div className="dropdown-content">
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </div>
        </div>
      </div>
      <div className="menu">
        <a href="#about-section" className="about-link">O nama</a>
        <button className="login-btn">Prijavi se</button>
        <button className="register-btn">Registruj se</button>
      </div>
    </nav>
  );
}

export default NavBar;
