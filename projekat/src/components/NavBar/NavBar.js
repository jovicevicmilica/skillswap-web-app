import React from 'react';
import './NavBar.css';
import logo from '../../images/logofinal.png'; //slika logo - a

function NavBar() {
  return (
    <nav>
      <div className="logo-and-search">
        <img src={logo} alt="Logo" className="navbar-logo"/>
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
