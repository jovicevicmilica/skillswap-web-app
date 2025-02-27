import React, { useContext, useState, useEffect } from 'react';
import './AdminNav.css';
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';

const AdminNav = () => {
    //NAVBAR ADMINA
    const { currentUser, logout } = useContext(AuthContext); //trenutni korisnik i logout, da ga obrišemo iz local storage
    const [dropdownVisible, setDropdownVisible] = useState(false); //dropdown za mobilne uređaje
    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await logout();
            navigate("/login"); //izlogujemo se i vodi nas na login
        } catch (err) {
            toast.error(err.response.data);
            return;
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible); //na klik otvaramo/zatvaramo dropdown
    };

    const closeDropdown = () => {
        setDropdownVisible(false);
    };

    useEffect(() => {
        const closeDropdown = (e) => { //da omogućimo da klikom lijevo zatvorimo dropdown
            if (!e.target.closest('.admin-left')) {
                setDropdownVisible(false);
            }
        };

        if (dropdownVisible) {
            document.addEventListener('click', closeDropdown);
        }

        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, [dropdownVisible]);

    return (
        <div className="admin-navbar">
            <div className="admin-left">
                <Link to="/admin-page" style={{ textDecoration: "none" }}>
                    <div className="admin-logo"/>
                </Link>
                <Link to="/admin-page" style={{ textDecoration: "none" }} className="home-link">
                    <HomeIcon className="home-icon"/>
                </Link>
                <AppsIcon className="apps-icon" onClick={toggleDropdown}/>
                {dropdownVisible && (
                    <div className="admin-dropdown"> {/*dodajemo dropdown za mobilne i tablet uređaje*/}
                        <div className="admin-dropdown-item" onClick={() => {handleNavigation('/admin-page/users'); closeDropdown();}}>
                            Pregledaj korisnike
                        </div>
                        <div className="admin-dropdown-item" onClick={() => {handleNavigation('/admin-page/posts'); closeDropdown();}}>
                            Pregledaj objave
                        </div>
                        <div className="admin-dropdown-item" onClick={handleLogout}>
                            Odjavi se
                        </div>
                    </div>
                )}
                <div className="admin-search">
                    <button onClick={() => handleNavigation('/admin-page/users')} className="view-users">Pregledaj korisnike</button>
                    <button onClick={() => handleNavigation('/admin-page/posts')} className="view-posts">Pregledaj objave</button>
                    <button onClick={handleLogout}>Odjavi se</button>
                </div>
            </div>
            <div className="admin-user">
                <img src={"/upload/" + currentUser.profilePic} alt="" className="admin-user-pic"/>
                <span className="admin-name">{currentUser.name}</span>
            </div>
        </div>
    );
}

export default AdminNav;
