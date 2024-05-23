import React, { useState, useContext, useEffect } from 'react';
import './Update.css'; 
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import { makeRequest } from '../../axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AuthContext } from '../../context/authContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const skillTypeOptions = [
  { label: "imam", value: "imam" },
  { label: "želim", value: "želim" }
];

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

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const { updateUser } = useContext(AuthContext);
  const [texts, setTexts] = useState({
    email: user.email,
    password: '', //radi sigurnosti!
    name: user.name,
    town: { label: user.town, value: user.town },
    primarySkill: { label: user.primarySkill, value: user.primarySkill},
    primarySkillLevel: { label: user.primarySkillLevel, value: user.primarySkillLevel},
    learningPref: { label: user.learningPref, value: user.learningPref }
  });
  const [newSkill, setNewSkill] = useState({ type: '', skill: '', skillLevel: '' });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await makeRequest.get(`/skills/${user.id}`);
        setUserSkills(res.data);
      } catch (err) {
        console.error('Neuspješno dohvaćene vještine:', err);
      }
    };

    fetchSkills();
  }, [user.id]);

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name] : e.target.value }));
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      await makeRequest.delete(`/skills/${skillId}`);
      setUserSkills(currentSkills => currentSkills.filter(skill => skill.id !== skillId));
      toast.success("Vještina je uspješno obrisana.");
    } catch (error) {
      console.error('Greška prilikom brisanja vještine:', error);
      toast.error('Greška prilikom brisanja vještine.');
    }
  };

  const handleAddSkill = async () => {
    try {
      const res = await makeRequest.post('/skills', {
        userId: user.id,
        ...newSkill
      });
      setUserSkills(currentSkills => [...currentSkills, { ...newSkill, id: res.data.skillId }]);
      setNewSkill({ type: '', skill: '', skillLevel: '' }); //resetovanje forme nakon dodavanja
      toast.success('Vještina je uspješno dodana.');
    } catch (error) {
      console.error('Greška u dodavanju vještine:', error);
      toast.error('Greška u dodavanju vještine.');
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user) => {
        return makeRequest.put("/users", user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
      toast.success('Profil je uspješno ažuriran.');
    },
    onError: () => {
      toast.error('Greška prilikom ažuriranja profila.');
    }
  });

  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;
    
    const updatedUser = {
        ...texts,
        town: texts.town.value,
        coverPic: coverUrl,
        profilePic: profileUrl,
        learningPref: texts.learningPref.value,
        primarySkill: texts.primarySkill.value,
        primarySkillLevel: texts.primarySkillLevel.value,
    };

    if(texts.password) {
        updatedUser.password = texts.password;
    };

    mutation.mutate(updatedUser);
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
    updateUser(updatedUser);
    setTexts(prev => ({ ...prev, password: '' })); //resetovanje
  };

  return (
    <div className="update-overlay">
      <div className="update-content">
        <h1>Ažuriraj profil</h1>
        <button className="update-close-button" onClick={() => setOpenUpdate(false)}>
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
                    <img src={profile ? URL.createObjectURL(profile) : "./upload/" + user.profilePic} alt="" />
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
            <label className="update-form-label">Nivo primarne vještine</label>
            <Select
                value={ texts.primarySkillLevel }
                onChange={value => setTexts(prev => ({ ...prev, primarySkillLevel: value }))}
                options={skillLevelOptions}
                styles={customStyles}   
                className='update-form-select'
            />
            <button className="profile-button-update" onClick={handleClick}>Ažuriraj</button>
            <h1>Ažuriraj vještine</h1>
            <p>Uzmite u obzir da smijete imati ukupno 3 vještine koje posjedujete (uključujući primarnu) i ukupno 3 koje vas interesuju! Preko nećete moći dodati!</p>
            <label className="update-form-label">Tip nove vještine</label>
            <Select
              value={skillTypeOptions.find(option => option.value === newSkill.type)}
              onChange={option => setNewSkill(prev => ({ ...prev, type: option.value }))}
              options={skillTypeOptions}
              styles={customStyles}
              className='update-form-select'
            />
            <label className="update-form-label">Nova vještina</label>
            <Select
              value={transformedOptions.flatMap(group => group.options).find(option => option.value === newSkill.skill)}
              onChange={option => setNewSkill(prev => ({ ...prev, skill: option.value }))}
              options={transformedOptions}
              styles={customStyles}
              className='update-form-select'
            />
            <label className="update-form-label">Nivo znanja nove vještine</label>
            <Select
              value={skillLevelOptions.find(option => option.value === newSkill.skillLevel)}
              onChange={option => setNewSkill(prev => ({ ...prev, skillLevel: option.value }))}
              options={skillLevelOptions}
              styles={customStyles}
              className='update-form-select'
            />
            <button onClick={handleAddSkill} className="profile-button-smaller" disabled={(newSkill.type === 'imam' && userSkills.filter(skill => skill.type === 'imam').length >= 2) || (newSkill.type === 'želim' && userSkills.filter(skill => skill.type === 'želim').length >= 3)}>Dodaj vještinu</button>
            <div>
              <label className="update-form-label">Vještine koje posjedujete (osim primarne)</label>
              {userSkills.map((skill, index) => (
                <div key={index} className="update-items">
                  {skill.skill} ({skill.skillLevel}) - {skill.type}
                  <button onClick={() => handleDeleteSkill(skill.id)} className="profile-button-smaller">Obriši</button>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Update;
