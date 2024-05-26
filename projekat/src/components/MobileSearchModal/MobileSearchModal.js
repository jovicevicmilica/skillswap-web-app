import React, { useState, useEffect } from 'react';
import './MobileSearchModal.css';
import Select from 'react-select';
import CloseIcon from '@mui/icons-material/Close';
import { debounce } from 'lodash';
import { makeRequest } from '../../axios';
import { useNavigate } from 'react-router-dom';

const townOptions = [
  { label: "Podgorica", value: "Podgorica" },
  { label: "Nikšić", value: "Nikšić" },
  { label: "Herceg Novi", value: "Herceg Novi" },
  { label: "Pljevlja", value: "Pljevlja" },
  { label: "Bijelo Polje", value: "Bijelo Polje" },
  { label: "Bar", value: "Bar" },
  { label: "Cetinje", value: "Cetinje" },
  { label: "Ulcinj", value: "Ulcinj" },
  { label: "Kotor", value: "Kotor" },
  { label: "Budva", value: "Budva" },
];

const skillOptions = {
  'Poslovanje': [
    "Marketing", "Freelance", "Liderstvo", "Preduzetništvo", "Menadžment",
    "Trgovanje kriptovalutama", "Vođenje bloga", "Društveni mediji",
    "Finansije", "Microsoft Powerpoint", "Javni govor", "Tehnike prezentovanja",
    "Poslovna analitika", "Produktivnost", "Računovodstvo", "Vizualizacija podataka",
    "SEO", "Microsoft Excel",
  ],
  'Kreativnost': [
    "Crtanje", "Animiranje", "Grafički dizajn", "Slikanje", "Fotografija",
    "Videografija", "Web dizajn", "Kaligrafija", "2D animacije", "3D animacije",
    "3D dizajn", "3D modeliranje", "Dizajn karaktera", "Adobe alati", "Ilustracija", 
    "Strip umjetnost", "Kreativno pisanje", "Pisanje tekstova", 
    "Moda", "Dizajn logotipa", "Uređivanje fotografija", "Dizajn korisničkog interfejsa",
    "Akvarel", "Pripovijedanje", "Pisanje poezije",
  ],
  'Tehnologija': [
    "Dizajn igara", "Data science", "Razvoj web-a", "Upravljanje proizvodima",
    "Razvoj mobilnih aplikacija", "CSS", "Blockchain", "React", "HTML", "HTML5",
    "C programski jezik", "Python programski jezik", "C++ programski jezik", "Java programski jezik",
    "Javascript", "Webflow", "Wordpress",
  ],
  'Životni stil': [
    "Kulinarstvo", "E-sport i gaming", "Jezici", "Pekarstvo", "Trčanje", "Gimnastika",
    "Vezenje", "Heklanje", "Pletenje", "Šivenje", "Fitness i osobni trening", "Wellness i samopomoć",
    "Dizajn odjeće", "Dizajn enterijera", "Košarka", "Fudbal", "Tenis", "Odbojka",
    "Šminkanje", "Dizajn nakita",
  ]
};

const transformedOptions = Object.keys(skillOptions).map(category => ({
  label: category,
  options: skillOptions[category].map(skill => ({ label: skill, value: skill }))
}));

const skillLevelOptions = [
  { label: "loš", value: "loš" },
  { label: "srednji", value: "srednji" },
  { label: "odličan", value: "odličan" },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: '1px solid rgba(0, 0, 0, 0)', 
    color: '#000',
    backgroundColor: 'rgba(0, 69, 246, .1)',
    padding: '5px 5px 5px',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '1.42857',
    borderRadius: 0,
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: 0,
  }),
};

const MobileSearchModal = ({ setShowMobileSearch, executeDetailedSearch }) => {
    const [town, setTown] = useState(null);
    const [hasSkill, setHasSkill] = useState(null);
    const [hasSkillLevel, setHasSkillLevel] = useState(null);
    const [wantsSkill, setWantsSkill] = useState(null);
    const [wantsSkillLevel, setWantsSkillLevel] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const debouncedSearch = debounce(async (query, filters) => {
        const params = {
            query: query.trim(),
            town: filters.town ? filters.town.value : '',
            hasSkill: filters.hasSkill ? filters.hasSkill.value : '',
            hasSkillLevel: filters.hasSkillLevel ? filters.hasSkillLevel.value : '',
            wantsSkill: filters.wantsSkill ? filters.wantsSkill.value : '',
            wantsSkillLevel: filters.wantsSkillLevel ? filters.wantsSkillLevel.value : ''
        };
        if (params.query || params.town || params.hasSkill || params.hasSkillLevel || params.wantsSkill || params.wantsSkillLevel) {
            try {
                const response = await makeRequest.get(`/search/users`, { params });
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
        const filters = {
            town: town,
            hasSkill: hasSkill,
            hasSkillLevel: hasSkillLevel,
            wantsSkill: wantsSkill,
            wantsSkillLevel: wantsSkillLevel
        };
        if (searchQuery.trim() !== '') {
            debouncedSearch(searchQuery, filters);
        } else if (Object.values(filters).some(filter => filter)) {
            debouncedSearch('', filters);
        } else {
            setShowDropdown(false);
            setSearchResults([]);
        }
    }, [searchQuery, town, hasSkill, hasSkillLevel, wantsSkill, wantsSkillLevel]);

    return (
        <div className="mobile-search-overlay">
            <div className="mobile-search-content">
                <button className="mobile-close-button" onClick={() => setShowMobileSearch(false)}>
                    <CloseIcon />
                </button>
                <h1>Pretraga</h1>
                <div className="mobile-forms">
                    <input
                        type="text"
                        placeholder="Pretražite vještine ili osobe..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <h1>Detaljna pretraga</h1>
                <div>
                    <label className="mobile-form-label">Grad</label>
                    <Select
                        value={town}
                        onChange={setTown}
                        options={townOptions}
                        styles={customStyles}
                        className='mobile-form-select'
                        isClearable
                    />
                    <label className="mobile-form-label">Vještina koju korisnik ima</label>
                    <Select
                        value={hasSkill}
                        onChange={setHasSkill}
                        options={transformedOptions}
                        styles={customStyles}
                        className='mobile-form-select'
                        isClearable
                    />
                    <label className="mobile-form-label">Nivo vještine koju korisnik ima</label>
                    <Select
                        value={hasSkillLevel}
                        onChange={setHasSkillLevel}
                        options={skillLevelOptions}
                        styles={customStyles}
                        className='mobile-form-select'
                        isClearable
                    />
                    <label className="mobile-form-label">Vještina koju korisnik želi</label>
                    <Select
                        value={wantsSkill}
                        onChange={setWantsSkill}
                        options={transformedOptions}
                        styles={customStyles}
                        className='mobile-form-select'
                        isClearable
                    />
                    <label className="mobile-form-label">Nivo vještine koju korisnik želi</label>
                    <Select
                        value={wantsSkillLevel}
                        onChange={setWantsSkillLevel}
                        options={skillLevelOptions}
                        styles={customStyles}
                        className='mobile-form-select'
                        isClearable
                    />
                    {showDropdown && (
                        <div className="mobile-search-dropdown">
                            {searchResults.length > 0 ? (
                                searchResults.map((result) => (
                                    <div key={result.id} className="mobile-search-item" onClick={() => {
                                        navigate(`/home-page/profile/${result.id}`);
                                        setShowDropdown(false);
                                        setSearchQuery('');
                                        setShowMobileSearch(false);
                                    }}>
                                        <img src={"/upload/" + result.profilePic} alt={result.name} />
                                        <div className="mobile-search-item-text">
                                            <strong className="mobile-search-item-name">{result.name}</strong>
                                            <span>-</span>
                                            <span>{result.primarySkill}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="mobile-no-results">Nema rezultata pretrage.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MobileSearchModal;
