import React, { useState } from 'react';
import './DetailedSearchModal.css';
import Select from 'react-select';
import CloseIcon from '@mui/icons-material/Close';

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
  //transformacija onoga što odaberemo u select - u u željeni oblik
}));

const skillLevelOptions = [
  { label: "loš", value: "loš" },
  { label: "srednji", value: "srednji" },
  { label: "odličan", value: "odličan" },
];

const customStyles = { //stilovi za select
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

const DetailedSearchModal = ({ setShowDetailedSearch, executeDetailedSearch }) => {
    //MODAL ZA DETALJNU PRETRAGU
    const [town, setTown] = useState('');
    const [hasSkill, setHasSkill] = useState('');
    const [hasSkillLevel, setHasSkillLevel] = useState('');
    const [wantsSkill, setWantsSkill] = useState('');
    const [wantsSkillLevel, setWantsSkillLevel] = useState(''); //filteri za detailed search

    const handleSearch = () => {
        const criteria = { town: town.value, hasSkill: hasSkill.value, hasSkillLevel: hasSkillLevel.value, wantsSkill: wantsSkill.value, wantsSkillLevel: wantsSkillLevel.value };
        executeDetailedSearch(criteria); //izvršimo pretragu, ovo je u HomeNav dijelu definisano
        setShowDetailedSearch(false); //mičemo modal
    };

    return (
        <div className="detailed-search-overlay">
            <div className="detailed-search-content">
                <h1>Detaljna pretraga</h1>
                <button className="update-close-button" onClick={() => setShowDetailedSearch(false)}>
                    <CloseIcon />
                </button>
                <div className="forms">
                    <label className="update-form-label">Grad</label>
                    <Select
                        value={town}
                        onChange={(selectedOption) => setTown(selectedOption)}
                        options={townOptions}
                        styles={customStyles}
                        className='update-form-select'
                    />
                    <label className="update-form-label">Vještina koju korisnik ima</label>
                    <Select
                        value={hasSkill}
                        onChange={(selectedOption) => setHasSkill(selectedOption)}
                        options={transformedOptions}
                        styles={customStyles}
                        className='update-form-select'
                    />
                    <label className="update-form-label">Nivo vještine koju korisnik ima</label>
                    <Select
                        value={hasSkillLevel}
                        onChange={(selectedOption) => setHasSkillLevel(selectedOption)}
                        options={skillLevelOptions}
                        styles={customStyles}
                        className='update-form-select'
                    />
                    <label className="update-form-label">Vještina koju korisnik želi</label>
                    <Select
                        value={wantsSkill}
                        onChange={(selectedOption) => setWantsSkill(selectedOption)}
                        options={transformedOptions}
                        styles={customStyles}
                        className='update-form-select'
                    />
                    <label className="update-form-label">Nivo vještine koju korisnik želi</label>
                    <Select
                        value={wantsSkillLevel}
                        onChange={(selectedOption) => setWantsSkillLevel(selectedOption)}
                        options={skillLevelOptions}
                        styles={customStyles}
                        className='update-form-select'
                    />
                    <button onClick={handleSearch} className="profile-button-update">Pretraži</button>
                </div>
            </div>
        </div>
    );
};

export default DetailedSearchModal;
