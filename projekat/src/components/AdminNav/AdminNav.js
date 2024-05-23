import React, { useContext, useState, useEffect } from 'react';
import './AdminNav.css';
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axios';
import { toast } from 'react-toastify';

const AdminNav = () => {
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

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="admin-navbar">
            <div className="admin-left">
                <Link to="/admin-page" style={{ textDecoration: "none" }}>
                    <div className="admin-logo"/>
                </Link>
                <Link to="/admin-page" style={{ textDecoration: "none" }} className="home-link">
                    <HomeIcon className="home-icon"/>
                </Link>
                <AppsIcon />
                <div className="admin-search">
                    <button onClick={() => handleNavigation('/admin-page/users')}>Pregledaj korisnike</button>
                    <button onClick={() => handleNavigation('/admin-page/posts')}>Pregledaj objave</button>
                    <button onClick={handleLogout}>Odjavi se</button>
                </div>
            </div>
            <div className="admin-user">
                <img src={"/upload/" + currentUser.profilePic} alt="" />
                <span className="admin-namea">{currentUser.name}</span>
            </div>
        </div>
    );
}

export default AdminNav;
