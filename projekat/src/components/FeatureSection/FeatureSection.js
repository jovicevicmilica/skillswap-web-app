import React from 'react';
import './FeatureSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'; //ikonica za štrik

function FeatureSection() {
  return (
    <div className="feature-section"> 
      {/*lijevi dio gdje je samo pitanje*/}
      <p class="title"> Zašto <span className="feature-h"><b>SkillSwap</b></span>?</p>
      {/*lista koja odgovara na pitanje*/}
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
  );
}

export default FeatureSection;
