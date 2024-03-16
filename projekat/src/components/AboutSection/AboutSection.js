import React from 'react';
import './AboutSection.css';
import aboutphoto from '../../images/about.jpg';

function AboutSection() {
  return (
    <div id="about-section" className="about-section">
    	<div className="about-left">
        <img src={aboutphoto} alt="About" className="about-photo"/>
      </div>
      <div className="about-details">
        <h2 className="about-title">O nama:</h2>
        <p className="about-content">
          SkillSwap je platforma koja omogućava ljudima da razmjenjuju vještine i znanja širom Crne Gore. 
          Ukoliko znate nešto korisno i želite da podijelite ili tražite nekoga ko bi vam pomogao 
          da naučite nešto novo, na pravom ste mjestu. Pridružite se našoj zajednici entuzijasta i 
          profesionalaca i obogatite svoje životne i profesionalne vještine.
        </p>
      </div>
    </div>
  );
}

export default AboutSection;
