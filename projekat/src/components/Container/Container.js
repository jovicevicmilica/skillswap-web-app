import React from 'react';
import './Container.css';
import skill1 from '../../images/1.jpg';
import skill2 from '../../images/2.jpg';
import skill3 from '../../images/3.jpg';
import skill4 from '../../images/4.jpg';
import skill5 from '../../images/5.jpg';
import skill6 from '../../images/6.jpg';
import skill7 from '../../images/7.jpg';
import skill8 from '../../images/8.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //awesome icon za ikonice
import { faGoogle, faFacebook, faApple } from '@fortawesome/free-brands-svg-icons';

function Container() {
  return (
    <div className="container">
       {/*lijevi deo sa dve slike*/}
        <div className="side-section">
          <img src={skill1} alt="Skill 1" className="image-lu"/>
          <img src={skill2} alt="Skill 2" className="image-lb"/>
        </div>
        
        {/*srednji dio sa 4 slike i centralnim box - em*/}
        <div className="middle-section">
          <div className="images-section">
            <img src={skill3} alt="Skill 3" className="image-mlu"/>
            <img src={skill4} alt="Skill 4" className="image-mru"/>
          </div>
          {/*centralni box*/}
          <div id="central-box" className="central-box">
            <h1>Otkrijte nove vještine, podijelite svoje znanje.</h1>
            <p>Prijavite se na <span className="for-underline"><b>SkillSwap</b></span> i počnite sada!</p>
            <button className="social-signup google"><FontAwesomeIcon icon={faGoogle} className="sticker"/> Prijavite se preko Google naloga</button>
            <button className="social-signup facebook"><FontAwesomeIcon icon={faFacebook} className="sticker"/> Prijavite se preko Facebook naloga</button>
            <button className="social-signup apple"><FontAwesomeIcon icon={faApple} className="sticker"/> Prijavite se preko Apple ID</button>
            <button className="email-signup">Prijavite se preko e-mail adrese</button>
            <p className="terms">
              Pri registraciji prihvatate naše uslove korišćenja i politiku privatnosti.
            </p>
          </div>
          <div className="images-section">
            <img src={skill5} alt="Skill 5" className="image-mlb"/>
            <img src={skill6} alt="Skill 6" className="image-mrb"/>
          </div>
        </div>
      
        {/*desni dio sa dvije slike*/}
        <div className="side-section">
          <img src={skill7} alt="Skill 7" className="image-ru"/>
          <img src={skill8} alt="Skill 8" className="image-rb"/>
        </div>
    </div>
  );
}

export default Container;
