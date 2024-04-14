import React from 'react';
import './FeatureSection.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons'; //ikonica za štrik

function FeatureSection() {
  return (
    <div className="feature-section" id="feature-section">
      <div className="feature-container">
        <div className="feature-container-inner">
          <div className="feature-heading"><div>Osnažite svoje talente: Povežite se, dijelite znanje i napredujte u našem ekosistemu za razmjenu vještina.</div></div>
          <div className="feature-subheading"><div>Naša platforma Vam omogućava da:</div></div>
          <div className="blocks">
            <div className="feature-block">
              <div className="feature-block-inner"><div>Razvijete svoje sposobnosti kroz interaktivnu razmjenu znanja.</div></div>
              <div className="feature-block-img swap"></div>
            </div>
            <div className="feature-block">
              <div className="feature-block-inner"><div>Doprinesete i proširite svoj profesionalni razvoj učenjem i podučavanjem.</div></div>
              <div className="feature-block-img communication"></div>
            </div>
            <div className="feature-block">
              <div className="feature-block-inner"><div>Stvorite nova prijateljstva obogaćujući svoj životni put zajedničkim učenjem i razmjenom vještina.</div></div>
              <div className="feature-block-img friendship"></div>
            </div>
          </div>
        </div> 
      </div>
    </div> 
  );
}

export default FeatureSection;
