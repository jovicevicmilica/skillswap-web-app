import React, { useState } from 'react';
import './AddUserPopup.css'; 
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import { makeAdminRequest } from '../../axiosAdm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const learningPrefOptions = [
    { label: "uživo", value: "uživo" },
    { label: "online", value: "online" },
    { label: "oboje", value: "oboje" },
];

const skillLevelOptions = [
  { label: "loš", value: "loš" },
  { label: "srednji", value: "srednji" },
  { label: "odličan", value: "odličan" },
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

const AddUserPopup = ({ setIsAddUserPopupOpen, onAddUser }) => {
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        town: '',
        primarySkill: '',
        learningPref: '',
        primarySkillLevel: '',
    });

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (selectedOption, { name }) => {
        setNewUser({ ...newUser, [name]: selectedOption.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await makeAdminRequest.post('/users', newUser);
            console.log(response.data);
            onAddUser(response.data); 
            setIsAddUserPopupOpen(false);
            toast.success("Korisnik uspješno dodat.");
        } catch (error) {
            console.error('Nije moguće dodati korisnika:', error);
            toast.error("Greška prilikom dodavanja korisnika.");
        }
    };

    return (
        <div className="update-overlay">
            <div className="update-content">
                <h1>Dodaj korisnika</h1>
                <button className="update-close-button" onClick={() => setIsAddUserPopupOpen(false)}>
                    <CloseIcon />
                </button>
                <form onSubmit={handleSubmit}>
                    <div className="forms">
                        <label className="update-form-label">Ime i prezime</label>
                        <input
                            type="text"
                            name="name"
                            value={newUser.name}
                            onChange={handleChange}
                            className="update-form-input"
                        />
                        <label className="update-form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleChange}
                            className="update-form-input"
                        />
                        <label className="update-form-label">Lozinka</label>
                        <input
                            type="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleChange}
                            className="update-form-input"
                        />
                        <label className="update-form-label">Grad</label>
                        <Select
                            name="town"
                            value={townOptions.find(option => option.value === newUser.town)}
                            onChange={handleSelectChange}
                            options={townOptions}
                            styles={customStyles}
                            className="update-form-select"
                        />
                        <label className="update-form-label">Primarna vještina</label>
                        <Select
                            name="primarySkill"
                            value={transformedOptions.flatMap(group => group.options).find(option => option.value === newUser.primarySkill)}
                            onChange={handleSelectChange}
                            options={transformedOptions}
                            styles={customStyles}
                            className="update-form-select"
                        />
                        <label className="update-form-label">Nivo znanja primarne vještine</label>
                        <Select
                            name="primarySkillLevel"
                            value={skillLevelOptions.find(option => option.value === newUser.primarySkillLevel)}
                            onChange={handleSelectChange}
                            options={skillLevelOptions}
                            styles={customStyles}
                            className="update-form-select"
                        />
                        <label className="update-form-label">Preference učenja</label>
                        <Select
                            name="learningPref"
                            value={learningPrefOptions.find(option => option.value === newUser.learningPref)}
                            onChange={handleSelectChange}
                            options={learningPrefOptions}
                            styles={customStyles}
                            className="update-form-select"
                        />
                        <button type="submit" className="profile-button-update">Dodaj</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddUserPopup;
