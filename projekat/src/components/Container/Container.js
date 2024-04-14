import React from 'react';
import './Container.css';

function Container() {
  function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="container">
      <div className="container-inner">
        <div className="container-text-wrapper">
          <div>
            Otkrijte i razvijte nove 
            <span className="blue-text"> vještine</span>, podijelite svoje <span className="blue-text">znanje i iskustvo</span>, pa izgradite svoju <span className="blue-text">zajednicu</span>.
          </div>
          <button className="black-button" onClick={() => scrollToSection("feature-section")}>Saznaj više</button>
        </div>
        <div className="container-img">
          <div className="code float"></div>
          <div className="guitar float"></div>
          <div className="cook float"></div>
          <div className="game float"></div>
          <div className="paint float"></div>
          <div className="book"></div>
          <div className="shine float"></div>
          <div className="shine two float"></div>
          <div className="shine three float"></div>
          <div className="shine four float"></div>
        </div>
      </div>
    </div> 
  );
}

export default Container;
