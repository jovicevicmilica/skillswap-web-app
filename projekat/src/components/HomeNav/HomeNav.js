import React, { useContext, useState, useEffect } from 'react';
import './HomeNav.css';
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import MessageIcon from '@mui/icons-material/Message';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axios';
import { debounce } from 'lodash';
import DetailedSearchModal from '../DetailedSearchModal/DetailedSearchModal';
import HomeDropdown from '../HomeDropdown/HomeDropdown';
import MobileSearchModal from '../MobileSearchModal/MobileSearchModal';

const HomeNav = () => {
    //NAVBAR NA STRANI KORISNIKA
    const { currentUser } = useContext(AuthContext); //trenutni korisnik
    const [showMessages, setShowMessages] = useState(false); //da li se prikazuje dropdown poruka
    const [messages, setMessages] = useState([]); //da li se prikazuju poruke
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDetailedSearch, setShowDetailedSearch] = useState(false); //search, dropdown za search, rezultati i detaljni search
    const [showHomenavDropdown, setShowHomenavDropdown] = useState(false); //dropdown za mobilne uređaje
    const [showMobileSearch, setShowMobileSearch] = useState(false); //search za mobilne uređaje
    const navigate = useNavigate();

    const debouncedSearch = debounce(async (query) => {
        //pozivamo ga na svakih 300ms da ne opterećujemo API
        if (query.trim().length > 0) { //ako je nešto unijeto u search
            try {
                const response = await makeRequest.get(`/search/users?query=${query}`); //pridobijemo rezultate
                setSearchResults(response.data); //postavimo ih
                setShowDropdown(true); //prikažemo dropdown za korisnike koji ispunjavaju zahtjeve
            } catch (error) {
                console.error('Greška u pretrazi:', error);
                setSearchResults([]); //refreshujemo search 
                setShowDropdown(true); 
            }
        } else {
            setShowDropdown(false); //zatvaramo dropdown ako ništa nije unijeto
            setSearchResults([]);
        }
    }, 300);

    useEffect(() => {
        if (searchQuery.trim() !== '') { //ako se nešto unese odmah se poziva debouncedSearch
            debouncedSearch(searchQuery);
        } else {
            setShowDropdown(false);
            setSearchResults([]);
        }
    }, [searchQuery]);

    useEffect(() => { //da možemo dropdown zatvoriti klikom pored, od search - a
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

    useEffect(() => { //isto tako za dropdown obični, od aplikacija
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
        //detaljni search, nema query već samo filtere, pa proslijeđujemo parametre umjesto query - ja
        try {
            const response = await makeRequest.get('/search/users', { params: criteria });
            setSearchResults(response.data); //prikažemo rezultate
            setShowDropdown(true);
        } catch (error) {
            console.error('Greška u pretrazi:', error);
            setSearchResults([]);
            setShowDropdown(true); 
        }
    };

    const toggleMessagesDropdown = () => { //da li će nam biti otvorene ili zatvorene poruke
        setShowMessages(!showMessages);
    };

    const fetchMessages = async () => {
        try {
            const response = await makeRequest.get('/messages/showMessages'); //da pridobijemo poruke
            setMessages(response.data); //prikažemo ih
        } catch (error) {
            console.error('Neuspješno dohvaćene poruke:', error);
        }
    };

    useEffect(() => { //da se automatski pridobiju poruke za korisnika
        fetchMessages();
    }, []);

    const openDetailedSearch = () => { //otvaramo detaljni search, to znači da se miče dropdown od običnog search - a, briše se to što je unijeto i otvara detaljni search
        setShowDropdown(false);
        setSearchQuery('');
        setShowDetailedSearch(true);
    };

    const toggleHomenavDropdown = () => { //da otvorimo dropdown za apk
        setShowHomenavDropdown(!showHomenavDropdown);
    };

    const closeHomenavDropdown = () => { //da ga zatvorimo
        setShowHomenavDropdown(false);
    };

    const openMobileSearch = () => { //da otvorimo search na mobilnom uređaju
        setShowMobileSearch(true);
    };

    const handleSearchIconClick = () => { //ako je širina < 769, otvara se mobilni search
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
                <AppsIcon onClick={toggleHomenavDropdown} /> {/*dropdown za apps*/}
                <div className="home-search">
                    <SearchIcon className="search-icon" onClick={handleSearchIconClick} /> {/*na lupu može da se klikne samo s telefona*/}
                    <input
                        type="text"
                        placeholder="Pretražite vještine ili osobe..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="detailed-search-btn" onClick={openDetailedSearch}>Detaljna pretraga</button> {/*otvaramo je*/}
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
                <div onClick={toggleMessagesDropdown}> {/*dropdown za poruke korisnika*/}
                    <MessageIcon className="home-icon"/> {/*prikažemo i broj poruka*/}
                    {messages.length > 0 && <span className="message-count">({messages.length})</span>}
                </div>
                {showMessages && (
                    <div className="messages-dropdown">
                        {messages.length > 0 ? ( /*ako ima poruka, prikazujemo dropdown*/
                            messages.map((msg, index) => (
                                <p key={index}>
                                    Uspješno ste se povezali sa korisnikom <span className="message-name">{msg.name}</span>. Ako želite sklopiti dogovor oko razmjene vještina, možete ga/je kontaktirati na 
                                    <a href={`mailto:${msg.email}?subject=Zahtjev za razmjenu vještina&body=Pozdrav ${msg.name},%0D%0AŽelim razgovarati o mogućoj razmjeni vještina.%0D%0APozdrav,%0D%0A${currentUser.name}`} className="message-email"> {msg.email}</a>.
                                    {/*da bi mogao da pošalje poruku direktno tom korisniku na klik, generisan sadržaj*/}
                                </p>
                            ))
                        ) : (
                            <p>Nema novih poruka.</p>
                        )}
                        <button onClick={fetchMessages}>Osvježi poruke</button> {/*ponovo pridobijemo poruke*/}
                    </div>
                )}
                <div className="home-user">
                    <img src={"/upload/" + currentUser.profilePic} alt="" />
                    <Link to={`/home-page/profile/${currentUser.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <span>{currentUser.name}</span> {/*da posjetimo svoj profil*/}
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
