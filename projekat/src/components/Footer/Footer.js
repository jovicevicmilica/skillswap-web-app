import React from 'react';
import { Link } from 'react-router-dom'; 
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="footer-container">
        <div className="newsletter-block" id="newsletter">
          <div className="footer-text">
            <div className="footer-header">Pretplatite se na mjesečne novosti</div>
            <div>Budite među prvima koji će saznati šta je novo na SkillSwap-u. Prijavite se već sada i otkrijte inspirativne priče članova, korisne savete za razvoj veština, najave ekskluzivnih događaja, i još mnogo toga.</div>
          </div>
          <div className="footer-form">
            <form>
              <div className="form-container">
                <input className="form-input"
                  placeholder="E-mail adresa"
                  type="email"
                  required
                  maxLength={256}
                />
                <input type="submit" data-wait="Molim sačekajte..." class="form-button" value="Prijavi se"/>
              </div>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <div className="logo-block">
              <Link to="/" className="footer-logo-link"><div className="footer-logo"/></Link>
              <div className="logo-block-inner">
                <div className="copyright-block">© Copyright {currentYear} SkillSwap</div>
                <div className="divider"></div>
                <div className="legal-block"><Link to="/legal" className="legal-link">Pravni uslovi</Link></div>
              </div>
            </div>
            <div className="email-block">
              <div className="email-h">
                <div className="decorative-line"></div>
                <div>E-mail</div>
              </div>
              <a href="mailto:skillswap24@gmail.com" className="email-link">skillswap24@gmail.com</a>
            </div>
          </div>
          <div className="follow-container">
            <div>Zaprati nas</div>
            <div className="instagram-link">
              <a id="instagram" href="https://instagram.com/" target="_blank" class="social-link"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;