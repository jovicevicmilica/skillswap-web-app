import React from 'react';
import { Link } from 'react-router-dom'; 
import './Legal.css'; 

function Legal() {
  return (
    <div className="legal">
        <div className="legal-main">
            <div className="legal-header-block">
                <h1 className="legal-header">Pravni uslovi</h1>
            </div>
            <div className="legal-white-block">
                <div className="legal-part-block">
                    <div className="legal-detail">
                        <div className="legal-title">Uslovi Korišćenja</div>
                        <div className="legal-button"><Link to="/terms-of-use" className="legal-button-details">Pročitaj Više</Link></div>
                    </div>
                </div>
                <div className="legal-part-block">
                    <div className="legal-detail">
                        <div className="legal-title">Politika Privatnosti</div>
                        <div className="legal-button"><Link to="/privacy-policy" className="legal-button-details">Pročitaj Više</Link></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="legal-black-block"></div>
    </div>
  );
}

export default Legal;