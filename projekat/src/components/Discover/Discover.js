import React from 'react';
import { Link } from 'react-router-dom'; 
import './Discover.css';

function Discover() {
  //DISCOVER BLOK
  return (
    <div className="discover-block">
        <div className="discover-container">
            <div className="discover-block-inner">
                <div className="discover-header">
                    <div className="decorative-line"></div>
                    <div>OTKRIJ</div>
                </div>
                <div className="discover-boxes">
                  <div className="discover-box-inner">
                    <div className="title">ZAŠTO SKILLSWAP</div>
                    <div className="discover-links">
                      <a href="#feature-section" className="discover-link">Prednosti</a>
                      <a href="#testimonials" className="discover-link">Testimonijali</a>
                    </div>
                  </div>  
                  <div className="discover-box-inner">
                    <div className="title">PRIJAVA</div>
                    <div className="discover-links">
                      <a href="/login" className="discover-link">Prijavi se</a>
                      <a href="/register" className="discover-link">Registruj se</a>
                    </div>
                  </div>  
                  <div className="discover-box-inner">
                    <div className="title">SAZNAJ</div>
                    <div className="discover-links">
                      <a href="#newsletter" className="discover-link">Novosti</a>
                      <a href="#skills-directory" className="discover-link">Vještine</a>
                    </div>  
                  </div>  
                  <div className="discover-box-inner">
                    <div className="title">PODRŠKA</div>
                    <div className="discover-links">
                      <a href="#faq" className="discover-link">FAQ</a>
                      <a href="/contact" className="discover-link">Kontakt</a>
                    </div> 
                  </div>  
                </div>
            </div>
        </div>
    </div>
  );
}

export default Discover;