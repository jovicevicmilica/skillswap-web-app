import React from 'react';
import './Profile.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import MessageIcon from '@mui/icons-material/Message';
import InfoIcon from '@mui/icons-material/Info';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from '../Posts/Posts';

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-images">
        <img src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/07/computer-coding.jpg" alt="" className="cover-photo" />
        <img src="https://www.shutterstock.com/image-photo/smiling-businesswoman-looking-camera-webcam-600nw-1302585136.jpg" alt="" className="profile-photo" />
      </div>
      <div className="profile-container">
        <div className="profile-user-info">
          <div className="profile-left">
            <a href="mailto:jovicevicmilica72@gmail.com@example.com"><MailOutlineIcon fontSize="large" /></a> {/*large da bi bila veća*/}
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
                <span>učenje uživo</span> {/*preference onlajn/uživo, planiram na kraju da napravim tutorijal korišćenja pa bi se objasnilo*/}
              </div> 
            </div>
            <button className="profile-button">Zatraži razmjenu</button>
          </div>
          <div className="profile-right">
            <MessageIcon />
            <InfoIcon /> {/*za biografiju*/}
            <MoreVertIcon />
          </div>
        </div>
        <Posts />
      </div>
    </div>
  )
}

export default Profile;