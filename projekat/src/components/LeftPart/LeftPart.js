import { React, useContext } from 'react';
import './LeftPart.css';
import PeopleIcon from '@mui/icons-material/People';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import EmailIcon from '@mui/icons-material/Email';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CollectionsIcon from '@mui/icons-material/Collections';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { AuthContext } from '../../context/authContext';

const LeftPart = () => {
  const { currentUser } = useContext(AuthContext); 

  return (
    <div className="left-part">
      <div className="lp-container">
        <div className="lp-menu">
          <div className="lp-user">
            <img src={"/upload/" + currentUser.profilePic} alt="" />
            <span>{currentUser.name}</span>
          </div>
          <div className="lp-item">
            <PeopleIcon className="icon-color-blue" />
            <span>Povezani</span>
          </div>
          <div className="lp-item">
            <SwapVertIcon className="icon-color-blue" />
            <span>Razmjena</span>
          </div>
          <div className="lp-item">
            <GroupsIcon className="icon-color-blue" />
            <span>Grupno učenje</span>
          </div>
        </div>
        <hr/> {/*druga sekcija!*/}
        <div className="lp-menu">
          <span>Vaše prečice</span>
          <div className="lp-item">
            <CalendarMonthIcon className="icon-color-blue" />
            <span>Događaji</span>
          </div>
          <div className="lp-item">
            <EmailIcon className="icon-color-blue" />
            <span>Poruke</span>
          </div>
          <div className="lp-item">
            <CollectionsIcon className="icon-color-blue" />
            <span>Galerija</span>
          </div>
        </div>
        <hr/> 
        <div className="lp-menu">
          <span>Ostalo</span>
          <div className="lp-item">
            <AutoStoriesIcon className="icon-color-blue" />
            <span>Priče o vještinama</span>
          </div>
          <div className="lp-item">
            <WorkIcon className="icon-color-blue"/>
            <span>Kursevi</span>
          </div>
          <div className="lp-item">
            <LightbulbIcon className="icon-color-blue" />
            <span>Tutorijali</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftPart;