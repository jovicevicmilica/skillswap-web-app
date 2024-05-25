import React, { useContext, useState, useEffect } from 'react';
import './HomeNav.css';
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axios';
import { debounce } from 'lodash';
import DetailedSearchModal from '../DetailedSearchModal/DetailedSearchModal';
import HomeDropdown from '../HomeDropdown/HomeDropdown';

const HomeNav = () => {
    const { currentUser } = useContext(AuthContext);
    const [showMessages, setShowMessages] = useState(false);
    const [messages, setMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDetailedSearch, setShowDetailedSearch] = useState(false);
    const [showHomenavDropdown, setShowHomenavDropdown] = useState(false);
    const navigate = useNavigate();

    //koristimo debouncedSearch da ne bi previše opteretili server tako što mu šaljemo zahtjev svako malo
    //pa šaljemo na 300ms dok se kuca
    const debouncedSearch = debounce(async (query) => {
        if (query.trim().length > 0) {
            try {
                const response = await makeRequest.get(`/search/users?query=${query}`);
                setSearchResults(response.data); //smjestimo u search rezultate to što dobijemo
                setShowDropdown(true);
            } catch (error) {
                console.error('Greška u pretrazi:', error);
                setSearchResults([]);
                setShowDropdown(false);
            }
        } else {
            setShowDropdown(false); //inače ugasimo search, ako se ne kuca ništa
            setSearchResults([]);
        }
    }, 300);

    useEffect(() => {
        if (searchQuery.trim() !== '') {
            debouncedSearch(searchQuery);
        } else {
            setShowDropdown(false);
            setSearchResults([]); //kad nema ništa, čistimo
        }
    }, [searchQuery]);

    useEffect(() => { //da lakše zatvorimo share klikom pored
        const closeDropdown = (e) => {
            if (!e.target.closest('.home-right')) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener('click', closeDropdown);
        }

        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, [showDropdown]);

    const executeDetailedSearch = async (criteria) => {
        try {
            const response = await makeRequest.get('/search/users', { params: criteria });
            setSearchResults(response.data);
            setShowDropdown(true);
        } catch (error) {
            console.error('Greška u pretrazi:', error);
            setSearchResults([]);
            setShowDropdown(false);
        }
    };

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

    const openDetailedSearch = () => {
        setShowDropdown(false);
        setSearchQuery(''); //čistimo search query kad otvorimo detailed search
        setShowDetailedSearch(true);
    };

    const toggleHomenavDropdown = () => {
        setShowHomenavDropdown(!showHomenavDropdown);
    };

    const closeHomenavDropdown = () => {
        setShowHomenavDropdown(false);
    };

    return (
        <div className="home-navbar">
            <div className="home-left">
                <Link to="/home-page" style={{ textDecoration: "none" }}>
                    <div className="homenav-logo"/>
                </Link>
                <Link to="/home-page" style={{ textDecoration: "none" }} className="home-link">
                    <HomeIcon className="home-icon"/>
                </Link>
                <AppsIcon onClick={toggleHomenavDropdown} className="apps-icon-container"/>
                {showHomenavDropdown && (
                    <HomeDropdown onClose={closeHomenavDropdown} />
                )}
                <div className="home-search">
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Pretražite vještine ili osobe..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="detailed-search-btn" onClick={openDetailedSearch}>Detaljna pretraga</button>
                    {showDropdown && searchResults.length > 0 && ( 
                        <div className="search-dropdown">
                            {searchResults.map((result) => (
                                <div key={result.id} className="search-item" onClick={() => {
                                    navigate(`/home-page/profile/${result.id}`);
                                    setShowDropdown(false);
                                    setSearchQuery(''); //očistimo search query nakon klika na profil
                                }}>
                                    <img src={"/upload/" + result.profilePic} alt={result.name} />
                                    <div className="search-item-text">
                                        <strong className="search-item-name">{result.name}</strong>
                                        <span>-</span>
                                        <span>{result.primarySkill}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
            {showDetailedSearch && (
                <DetailedSearchModal
                    setShowDetailedSearch={setShowDetailedSearch}
                    executeDetailedSearch={executeDetailedSearch}
                />
            )}
        </div>
    );
}

export default HomeNav;
