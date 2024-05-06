import React, { useState } from 'react';
import './Profile.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from '../Posts/Posts';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpIcon from '@mui/icons-material/Help';

const Profile = () => {
  const [showSkills, setShowSkills] = useState(false);

  const toggleSkills = () => {
    setShowSkills(!showSkills);
  };

  return (
    <div className="profile">
      <div className="profile-images">
        <img src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/07/computer-coding.jpg" alt="" className="cover-photo" />
        <img src="https://www.shutterstock.com/image-photo/smiling-businesswoman-looking-camera-webcam-600nw-1302585136.jpg" alt="" className="profile-photo" />
      </div>
      <div className="profile-container">
        {showSkills ? (
          <div className="profile-bio-info">
            <div className="bio-header">
                <div className="back-arrow" onClick={toggleSkills}>
                    <ArrowBackIcon />
                </div>
            </div>
            <div className="bio-content">
                <div className="column-left">
                  <h3>Vještine koje posjedujem:</h3>
                  <div className="bio-list">
                    <div className="bio-skill"><Brightness1Icon className="bio-icon red" /> Programiranje u JavaScript-u</div>
                    <div className="bio-skill"><Brightness1Icon className="bio-icon green" /> Web dizajn</div>
                    <div className="bio-skill"><Brightness1Icon className="bio-icon green" /> Upotreba alata za upravljanje projektima</div>
                  </div>
                </div>
                <div className="column-right">
                  <h3>Vještine koje tražim:</h3>
                  <div className="bio-list">
                    <div className="bio-skill"><Brightness1Icon className="bio-icon red" /> Učenje francuskog jezika</div>
                    <div className="bio-skill"><Brightness1Icon className="bio-icon green" /> Razvoj mobilnih aplikacija</div>
                    <div className="bio-skill"><Brightness1Icon className="bio-icon yellow" /> Marketinške strategije</div>
                  </div>
                </div>
            </div>
        </div>
        ) : (
          <div className="profile-user-info">
            <div className="profile-left">
              <HelpIcon className="icon-color-blue" fontSize='large' />
            </div>
            <div className="profile-center">
              <span className="profile-name">Milica Jovićević</span>
              <div className="profile-info">
                <div className="profile-item">
                  <PlaceIcon className="icon-color-blue" />
                  <span>Podgorica</span>
                </div>
                <div className="profile-item">
                  <StarIcon className="icon-color-blue" />
                  <span>učenje uživo</span>
                </div>
              </div>
              <button className="profile-button">Zatraži razmjenu</button>
            </div>
            <div className="profile-right">
              <InfoIcon onClick={toggleSkills} />
              <MoreVertIcon />
            </div>
          </div>
        )}
        <Posts />
      </div>
    </div>
  )
}

export default Profile;