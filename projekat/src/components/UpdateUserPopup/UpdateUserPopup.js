import React, { useState } from 'react';
import './UpdateUserPopup.css'; 
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import { makeAdminRequest } from '../../axiosAdm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const townOptions = [ //sve moguće opcije gradova
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

const learningPrefOptions = [ //preference učenja
  { label: "uživo", value: "uživo" },
  { label: "online", value: "online" },
  { label: "oboje", value: "oboje" },
];

const skillOptions = { //vještine za Select
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

const transformedOptions = Object.keys(skillOptions).map(category => ({ //transformišemo opcije u validan oblik za Select
  label: category,
  options: skillOptions[category].map(skill => ({ label: skill, value: skill }))
  //transformiše ih tako da label bude kategorija, zatim imamo niz opcija, u kojima imamo tip { label: ..., value: ... }
}));

const skillLevelOptions = [
  { label: "loš", value: "loš" },
  { label: "srednji", value: "srednji" },
  { label: "odličan", value: "odličan" },
];

const customStyles = { //lični stilovi za Select komponentu u React - u
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

const UpdateUserPopup = ({ setIsUpdateUserPopupOpen, user, onUserUpdated }) => {
  //AŽURIRANJE KORISNIKA NA STRANI ADMINA
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null); //naslovna i profilna
  const [texts, setTexts] = useState({ //inputi
    email: user.email,
    password: '', //radi sigurnosti!
    name: user.name,
    town: { label: user.town, value: user.town },
    primarySkill: { label: user.primarySkill, value: user.primarySkill},
    primarySkillLevel: { label: user.primarySkillLevel, value: user.primarySkillLevel},
    learningPref: { label: user.learningPref, value: user.learningPref }
  });

  const upload = async (file) => {
    try {
      const formData = new FormData(); //pravimo formu i dodamo fajl na nju
      formData.append("file", file);
      const res = await makeAdminRequest.post("/upload", formData); //uploadujemo fajl i dobijemo ga
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name] : e.target.value })); //sva prethodna stanja inputa mijenjamo tako što prethodna kopiramo
    //u novi objekat, i dodamo/ažuriramo value za ključ koji odgovara name tipu input - a
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user) => {
        return makeAdminRequest.put("/users", user); //ažuriramo profil korisnika
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['users']); //da nam 'zastari' i invalidira query kada više nije potreban
      toast.success('Profil je uspješno ažuriran.');
      console.log(data.data);
      onUserUpdated(data.data); //da bi nam se automatski uočile promjene nakon apdejta!
    },
    onError: () => {
      toast.error('Greška prilikom ažuriranja profila.');
    }
  });

  const handleClick = async (e) => {
    e.preventDefault(); //preventujemo default način na koji se submit - uje forma
    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic; //ako je stavljena profilna ili naslovna, uzimamo ih, da ih pretvorimo ispod u URL, inače ide stara slika korisnika
    profileUrl = profile ? await upload(profile) : user.profilePic;
    
    const updatedUser = { //stare ili ažurirane vrijednosti iz inputa
        ...texts,
        id: user.id,
        town: texts.town.value,
        coverPic: coverUrl || user.coverPic,
        profilePic: profileUrl || user.profilePic,
        learningPref: texts.learningPref.value,
        primarySkill: texts.primarySkill.value,
        primarySkillLevel: texts.primarySkillLevel.value,
    };

    if(texts.password) { //provjera je li password unijet, ako nije, ostaje stari
        updatedUser.password = texts.password;
    };

    mutation.mutate(updatedUser);
    setIsUpdateUserPopupOpen(false);
    setCover(null); //vratimo ih na null za sljedeći apdejt
    setProfile(null);
  };

  return (
    <div className="update-overlay">
      <div className="update-content">
        <h1>Ažuriraj profil</h1>
        <button className="update-close-button" onClick={() => setIsUpdateUserPopupOpen(false)}>
          <CloseIcon />
        </button>
        <form>
          <div className="forms">
            <label className="update-form-label" htmlFor='cover'>
                <span>Naslovna slika</span>
                <div className="image-container-update">
                    <img src={cover ? URL.createObjectURL(cover) : "./upload/" + user.coverPic} alt="" />
                    <CloudUploadIcon />
                </div>
            </label>
            <input className="update-form-input" type="file" id="cover" style={{ display: "none" }} onChange={(e) => setCover(e.target.files[0])} />
            <label className="update-form-label" htmlFor='profile'>
                <span>Profilna slika</span>
                <div className="image-container-update">
                    <img src={profile ? URL.createObjectURL(profile) : "./upload/" + user.profilePic} alt="" /> {/*ako ima profilne pretvaramo je u url, inače ide stara iz upload - a*/}
                    <CloudUploadIcon />
                </div>
            </label>
            <input className="update-form-input" type="file" id="profile" style={{ display: "none" }} onChange={(e) => setProfile(e.target.files[0])} />
            <label className="update-form-label">Email</label>
            <input
                type="text"
                value={texts.email}
                name="email"
                onChange={handleChange}
                className="update-form-input"
            />
            <label className="update-form-label">Nova lozinka</label>
            <input
                type="password"
                value={texts.password || ''}
                name="password"
                onChange={handleChange}
                className="update-form-input"
                placeholder="Unesite novu lozinku"
            />
            <label className="update-form-label">Ime i prezime</label>
            <input
                type="text"
                value={texts.name}
                name="name"
                onChange={handleChange}
                className="update-form-input"
            />
            <label className="update-form-label">Grad</label>
            <Select
                value={texts.town}
                onChange={value => setTexts(prev => ({ ...prev, town: value }))}
                options={townOptions}
                styles={customStyles}
                className='update-form-select'
            />
            <label className="update-form-label">Preference učenja</label>
            <Select
                value={texts.learningPref}
                onChange={value => setTexts(prev => ({ ...prev, learningPref: value }))}
                options={learningPrefOptions}
                styles={customStyles}   
                className='update-form-select'
            />
            <label className="update-form-label">Primarna vještina</label>
            <Select
                value={ texts.primarySkill }
                onChange={value => setTexts(prev => ({ ...prev, primarySkill: value }))}
                options={transformedOptions}
                styles={customStyles}   
                className='update-form-select'
            />
            <button className="profile-button-update" onClick={handleClick}>Ažuriraj</button>
          </div>
        </form>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default UpdateUserPopup;
