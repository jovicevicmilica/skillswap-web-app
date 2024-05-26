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
import MobileSearchModal from '../MobileSearchModal/MobileSearchModal';

const HomeNav = () => {
    const { currentUser } = useContext(AuthContext);
    const [showMessages, setShowMessages] = useState(false);
    const [messages, setMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDetailedSearch, setShowDetailedSearch] = useState(false);
    const [showHomenavDropdown, setShowHomenavDropdown] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const navigate = useNavigate();

    const debouncedSearch = debounce(async (query) => {
        if (query.trim().length > 0) {
            try {
                const response = await makeRequest.get(`/search/users?query=${query}`);
                setSearchResults(response.data);
                setShowDropdown(true);
            } catch (error) {
                console.error('Greška u pretrazi:', error);
                setSearchResults([]);
                setShowDropdown(true); 
            }
        } else {
            setShowDropdown(false);
            setSearchResults([]);
        }
    }, 300);

    useEffect(() => {
        if (searchQuery.trim() !== '') {
            debouncedSearch(searchQuery);
        } else {
            setShowDropdown(false);
            setSearchResults([]);
        }
    }, [searchQuery]);

    useEffect(() => {
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

    useEffect(() => {
        const closeDropdown = (e) => {
            if (!e.target.closest('.home-left')) {
                setShowHomenavDropdown(false);
            }
        };

        if (showHomenavDropdown) {
            document.addEventListener('click', closeDropdown);
        }

        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, [showHomenavDropdown]);

    const executeDetailedSearch = async (criteria) => {
        try {
            const response = await makeRequest.get('/search/users', { params: criteria });
            setSearchResults(response.data);
            setShowDropdown(true);
        } catch (error) {
            console.error('Greška u pretrazi:', error);
            setSearchResults([]);
            setShowDropdown(true); 
        }
    };

    const toggleMessagesDropdown = () => {
        setShowMessages(!showMessages);
    };

    const fetchMessages = async () => {
        try {
            const response = await makeRequest.get('/messages/showMessages'); 
            setMessages(response.data);
        } catch (error) {
            console.error('Neuspješno dohvaćene poruke:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const openDetailedSearch = () => {
        setShowDropdown(false);
        setSearchQuery('');
        setShowDetailedSearch(true);
    };

    const toggleHomenavDropdown = () => {
        setShowHomenavDropdown(!showHomenavDropdown);
    };

    const closeHomenavDropdown = () => {
        setShowHomenavDropdown(false);
    };

    const openMobileSearch = () => {
        setShowMobileSearch(true);
    };

    const handleSearchIconClick = () => {
        if (window.innerWidth < 769) {
            openMobileSearch();
        }
    };

    return (
        <div className="home-navbar">
            <div className="home-left">
                <Link to="/home-page" style={{ textDecoration: "none" }} className="home-link-icon">
                    <div className="homenav-logo"/>
                </Link>
                <Link to="/home-page" style={{ textDecoration: "none" }} className="home-link">
                    <HomeIcon className="home-icon"/>
                </Link>
                <AppsIcon onClick={toggleHomenavDropdown} />
                <div className="home-search">
                    <SearchIcon className="search-icon" onClick={handleSearchIconClick} />
                    <input
                        type="text"
                        placeholder="Pretražite vještine ili osobe..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="detailed-search-btn" onClick={openDetailedSearch}>Detaljna pretraga</button>
                    {showDropdown && (
                        <div className="search-dropdown">
                            {searchResults.length > 0 ? (
                                searchResults.map((result) => (
                                    <div key={result.id} className="search-item" onClick={() => {
                                        navigate(`/home-page/profile/${result.id}`);
                                        setShowDropdown(false);
                                        setSearchQuery('');
                                    }}>
                                        <img src={"/upload/" + result.profilePic} alt={result.name} />
                                        <div className="search-item-text">
                                            <strong className="search-item-name">{result.name}</strong>
                                            <span>-</span>
                                            <span>{result.primarySkill}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-results">Nema rezultata pretrage.</p>
                            )}
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
            {showHomenavDropdown && (
                <HomeDropdown
                    onClose={closeHomenavDropdown}
                />
            )}
            {showDetailedSearch && (
                <DetailedSearchModal
                    setShowDetailedSearch={setShowDetailedSearch}
                    executeDetailedSearch={executeDetailedSearch}
                />
            )}
            {showMobileSearch && (
                <MobileSearchModal
                    setShowMobileSearch={setShowMobileSearch}
                    executeDetailedSearch={executeDetailedSearch}
                />
            )}
        </div>
    );
}

export default HomeNav;
