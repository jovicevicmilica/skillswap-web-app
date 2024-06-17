import React from 'react';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import CollectionsIcon from '@mui/icons-material/Collections';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import { AuthContext } from '../../context/authContext';
import './HomeDropdown.css';
import { useContext } from 'react';

const HomeDropdown = ({ onClose }) => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const goToFriends = () => {
    navigate("/home-page/friends");
    onClose();
  };

  const goToExchange = () => {
    navigate("/home-page/exchange");
    onClose();
  };

  const goToGallery = () => {
    navigate("/home-page/gallery");
    onClose();
  };

  const goToRequests = () => {
    navigate("/home-page/requests");
    onClose();
  };

  const goToMessages = () => {
    navigate("/home-page/messages");
    onClose();
  };

  const goToProfile = () => {
    navigate(`/home-page/profile/${currentUser.id}`);
    onClose();
  };

  return (
    <div className="homenav-dropdown">
      <div className="homenav-dropdown-item" onClick={goToProfile}>
        <PersonIcon />
        <span>Profil</span>
      </div>
      <div className="homenav-dropdown-item" onClick={goToFriends}>
        <PeopleIcon />
        <span>Povezani</span>
      </div>
      <div className="homenav-dropdown-item" onClick={goToExchange}>
        <SwapVertIcon />
        <span>Razmjena</span>
      </div>
      <div className="homenav-dropdown-item" onClick={goToGallery}>
        <CollectionsIcon />
        <span>Galerija</span>
      </div>
      <div className="homenav-dropdown-item" onClick={goToMessages}>
        <MessageIcon />
        <span>Pretraži poruke</span>
      </div>
      <div className="homenav-dropdown-item" onClick={goToRequests}>
        <EmailIcon />
        <span>Pretraži nove zahtjeve</span>
      </div>
      <div className="homenav-dropdown-item" onClick={handleLogout}>
        <span>Odjavi se</span>
      </div>
    </div>
  );
};

export default HomeDropdown;
