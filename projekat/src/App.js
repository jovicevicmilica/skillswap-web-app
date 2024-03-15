import './App.css';
import React from 'react';
import logo from './logofinal.png';
import skill1 from './1.jpg';
import skill2 from './2.jpg';
import skill3 from './3.jpg';
import skill4 from './4.jpg';
import skill5 from './5.jpg';
import skill6 from './6.jpg';
import skill7 from './7.jpg';
import skill8 from './8.jpg';
import skill9 from './skill5.jpg';
import skill10 from './skill2.jpg';
import skill11 from './9.jpg';
import skill12 from './10.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faApple } from '@fortawesome/free-brands-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="App">
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
          <button className="login-btn">Prijavi se</button>
          <button className="register-btn">Registruj se</button>
        </div>
      </nav>
      <div className="container">
       {/* Levi deo sa dve slike */}
        <div className="side-section">
          <img src={skill4} alt="Skill 1" className="image-lu"/>
          <img src={skill9} alt="Skill 2" className="image-lb"/>
        </div>
        
        {/* Srednji deo sa četiri slike i centralnim boxom */}
        <div className="middle-section">
          <div className="images-section">
            <img src={skill3} alt="Skill 3" className="image-mlu"/>
            <img src={skill8} alt="Skill 4" className="image-mru"/>
          </div>
          {/* Centralni box ide ovdje */}
          <div className="central-box">
            {/* Sadržaj centralnog boxa */}
            <h1>Otkrijte nove vještine, podijelite svoje znanje.</h1>
            <p>Prijavite se na <span className="for-underline"><b>SkillSwap</b></span> i počnite sada!</p>
            <button className="social-signup google"><FontAwesomeIcon icon={faGoogle} className="sticker"/> Prijavite se preko Google naloga</button>
            <button className="social-signup facebook"><FontAwesomeIcon icon={faFacebook} className="sticker"/> Prijavite se preko Facebook naloga</button>
            <button className="social-signup apple"><FontAwesomeIcon icon={faApple} className="sticker"/> Prijavite se preko Apple ID</button>
            <button className="email-signup">Prijavite se preko e - mail adrese</button>
            <p className="terms">
              Pri registraciji prihvatate naše uslove korišćenja.
            </p>
          </div>
          <div className="images-section">
            <img src={skill11} alt="Skill 5" className="image-mlb"/>
            <img src={skill12} alt="Skill 6" className="image-mrb"/>
          </div>
        </div>
      
        <div className="side-section">
          <img src={skill7} alt="Skill 7" className="image-ru"/>
          <img src={skill10} alt="Skill 8" className="image-rb"/>
        </div>
    </div>
    <div className="feature-section">
      <p class="title"> Zašto <span className="feature-h"><b>SkillSwap</b></span>?</p>
      <ul class="features-list">
        <li>
          <span class="checkmark"><FontAwesomeIcon icon={faCheck} /></span> Razvijajte vještine u oblastima koje volite.
          <p className="mini-description">Otkrijte i unaprijedite svoje hobije uz pomoć prijatelja iz Crne Gore.</p>
        </li>
        <li>
          <span class="checkmark"><FontAwesomeIcon icon={faCheck} /></span> Podijelite sopstvene strasti i znanja.
          <p className="mini-description">Postanite mentor u zajednici koja cijeni vaš talenat i iskustvo.</p>
        </li>
        <li>
          <span class="checkmark"><FontAwesomeIcon icon={faCheck} /></span> Bogatstvo različitosti, zajednica koja inspiriše.
          <p className="mini-description">Razmenjujte veštine iz različitih kultura i proširite svoje vidike.</p>
        </li>
        <li>
          <span class="checkmark"><FontAwesomeIcon icon={faCheck} /></span> Jedinstvena prilika za učenje kroz upoznavanje.
          <p className="mini-description">Naučite nešto novo svaki dan, od kuvarskih vještina do programiranja.</p>
        </li>
      </ul>
    </div>
  </div>
  );
}

export default App;
