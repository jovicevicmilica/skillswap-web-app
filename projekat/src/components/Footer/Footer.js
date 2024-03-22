import React from 'react';
import { Link } from 'react-router-dom'; // Dodajte Link komponentu
import './Footer.css';
import logo from '../../images/logofinal.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer">
      <img src={logo} alt="SkillSwap Logo" className="footer-logo" />
      <div className="footer-content">
        <div className="footer-center">
          <Link to="/privacy-policy" className="footer-link">Politika Privatnosti</Link>
          <Link to="/terms-of-use" className="footer-link">Uslovi Korišćenja</Link>
          <Link to="/support" className="footer-link">Podrška</Link>
          <Link to="/contact" className="footer-link">Kontakt</Link>
        </div>
        <a href="https://www.instagram.com" className="instagram-link" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
      <div className="footer-bottom">
        <p>© 2024 SkillSwap</p>
      </div>
    </footer>
  );
}

export default Footer;