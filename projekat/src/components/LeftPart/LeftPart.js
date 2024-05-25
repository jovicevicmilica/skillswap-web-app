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
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const LeftPart = () => {
  const { currentUser, logout } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault(); /*da se stranica ne refreshuje*/
    try {
      await logout();
      navigate("/login");
    } 

    catch(err) {
      toast.error(err.response.data);
      return;
    }
  };

  const goToFriends = () => {
    navigate("/home-page/friends");
  };

  const goToExchange = () => {
    navigate("/home-page/exchange");
  };

  const goToGallery = () => {
    navigate("/home-page/gallery");
  };

  return (
    <div className="left-part">
      <div className="lp-container">
        <div className="lp-menu">
          <div className="lp-user">
            <img src={"/upload/" + currentUser.profilePic} alt="" />
            <Link to={`/home-page/profile/${currentUser.id}`} style={{textDecoration:"none", color:"inherit"}}> 
              <span>{currentUser.name}</span>
            </Link>
          </div>
          <span>Vaše prečice</span>
          <div className="lp-item" onClick={goToFriends}>
            <PeopleIcon className="icon-color-blue" />
            <span>Povezani</span>
          </div>
          <div className="lp-item" onClick={goToExchange}>
            <SwapVertIcon className="icon-color-blue" />
            <span>Razmjena</span>
          </div>
          <div className="lp-item" onClick={goToGallery}>
            <CollectionsIcon className="icon-color-blue" />
            <span>Galerija</span>
          </div>
          <div className="lp-item">
            <LightbulbIcon className="icon-color-blue" />
            <span>Tutorijal</span>
          </div>
          <button onClick={handleLogout} className="logout-button">Odjavi se</button>
        </div>
      </div>
    </div>
  )
}

export default LeftPart;
