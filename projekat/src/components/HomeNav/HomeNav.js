import React, { useContext, useState, useEffect } from 'react';
import './HomeNav.css';
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axios';

const HomeNav = () => {
    const { currentUser } = useContext(AuthContext);
    const [showMessages, setShowMessages] = useState(false);
    const [messages, setMessages] = useState([]);

    const toggleMessagesDropdown = () => {
        setShowMessages(!showMessages);
    };

    const fetchMessages = async () => {
        try {
            const response = await makeRequest.get('/messages/showMessages'); 
            setMessages(response.data.reverse()); //da bi išla najnovija na vrh!
        } catch (error) {
            console.error('Neuspješno dohvaćene poruke:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []); //ovaj prazan array osigurava da se useEffect pokrene samo jednom nakon učitavanja komponente.

    return (
        <div className="home-navbar">
            <div className="home-left">
                <Link to="/home-page" style={{ textDecoration: "none" }}>
                    <div className="homenav-logo"/>
                </Link>
                <Link to="/home-page" style={{ textDecoration: "none" }} className="home-link">
                    <HomeIcon className="home-icon"/>
                </Link>
                <AppsIcon />
                <div className="home-search">
                    <SearchIcon />
                    <input type="text" placeholder="Pretražite vještine ili osobe..." />
                </div> 
            </div>
            <div className="home-right">
                <div onClick={toggleMessagesDropdown}>
                <MessageIcon className="home-icon"/>
                {messages.length > 0 && <span className="message-count">({messages.length})</span>}
            </div>
            {showMessages && (
                <div className="messages-dropdown">
                    {messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <p key={index}>
                                Uspješno ste se povezali sa korisnikom <span className="message-name">{msg.name}</span>. Ako želite sklopiti dogovor oko razmjene vještina, možete ga/je kontaktirati na 
                                <a href={`mailto:${msg.email}?subject=Zahtjev za razmjenu vještina&body=Pozdrav ${msg.name},%0D%0AŽelim razgovarati o mogućoj razmjeni vještina.%0D%0APozdrav,%0D%0A${currentUser.name}`} className="message-email"> {msg.email}</a>.
                            </p>
                        ))
                    ) : (
                        <p>Nema novih poruka.</p>
                    )}
                    <button onClick={fetchMessages}>Osvježi poruke</button>
                </div>
            )}
            <div className="home-user">
                <img src={"/upload/" + currentUser.profilePic} alt="" />
                <Link to={`/home-page/profile/${currentUser.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <span>{currentUser.name}</span>
                </Link>
                </div>
            </div>
        </div>
    );
}

export default HomeNav;
