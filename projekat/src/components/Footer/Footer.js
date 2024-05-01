import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/newsletter/subscribe", { email });
      if (response.status === 200) {
        toast.success('Uspješno ste se pretplatili na newsletter.');
      } else {
        throw new Error('Greška prilikom pretplate na newsletter.');
      }
    } catch (error) {
      toast.error('Došlo je do greške prilikom pretplate na newsletter.');
      console.error('Greška prilikom pretplate na newsletter:', error);
    }
  };

  //odjava sa mjesečnih novosti
  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/newsletter/unsubscribe", { email });
      if (response.status === 200) {
        toast.success('Uspješno ste se odjavili.');
      } else {
        throw new Error('Greška prilikom odjave.');
      }
    } catch (error) {
      toast.error('Greška prilikom odjave.');
      console.error('Greška odjave:', error);
    }
  };

  return (
    <div className="footer">
      <div className="footer-container">
        <div className="newsletter-block" id="newsletter">
          <div className="footer-text">
            <div className="footer-header">Pretplatite se na mjesečne novosti</div>
            <div className="footer-p">Budite među prvima koji će saznati šta je novo na SkillSwap-u. Prijavite se već sada i otkrijte inspirativne priče članova, korisne savjete za razvoj vještina, najave ekskluzivnih događaja, i još mnogo toga.</div>
          </div>
          <div className="footer-form">
            <ToastContainer transition={Slide} closeOnClick />
            <form onSubmit={handleSubmit}>
              <div className="form-container">
                <input 
                  name="email"
                  className="form-input"
                  placeholder="E-mail adresa"
                  type="email"
                  required
                  maxLength={256}
                  value={email}
                  onChange={handleEmailChange}
                /> 
                <input type="submit" class="form-button" value="Prijavi se"/>
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
              <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="social-link"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;