import { React, useContext } from 'react'
import './HomeNav.css'
import HomeIcon from '@mui/icons-material/Home';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/authContext';

const HomeNav = () => {
  const { currentUser } = useContext(AuthContext); 

  return (
    <div className="home-navbar">
        <div className="home-left">
            <Link to="/home-page" style={{textDecoration:"none"}}>
                <div className="homenav-logo"/>
            </Link>
            <HomeIcon />
            <AppsIcon />
            <div className="home-search">
                <SearchIcon />
                <input type="text" placeholder="Pretražite vještine ili osobe..." />
            </div> 
        </div>
        <div className="home-right">
            <PersonIcon />
            <MessageIcon />
            <NotificationsIcon />
            <div className="home-user">
                <img src={currentUser.profilePicture} alt="" />
                <span>{currentUser.name}</span>
            </div>
        </div>
    </div>
  )
}

export default HomeNav;