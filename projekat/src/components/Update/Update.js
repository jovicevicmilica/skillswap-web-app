import React, { useState } from 'react';
import './Update.css'; 
import CloseIcon from '@mui/icons-material/Close';
import Select from 'react-select';
import { makeRequest } from '../../axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
  { label: "Loš", value: "Loš" },
  { label: "Srednji", value: "Srednji" },
  { label: "Odličan", value: "Odličan" },
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
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    town: user.town,
    primarySkill: user.primarySkill,
    primarySkillLevel: user.primarySkillLevel,
    learningPref: user.learningPref
  });
  const [userSkills, setUserSkills] = useState(user.userSkills || []);
  const [interestedSkills, setInterestedSkills] = useState(user.interestedSkills || []);

  const upload = async (file) => {
    try {
        const formData = new FormData();
        formData.append("file", file); 
        const res = await makeRequest.post("/upload", formData);
        return res.data;
    } catch(err) {
        console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name] : e.target.value }))
  };

  const handleSkillChange = (selectedOptions) => {
    setUserSkills(selectedOptions.map(skill => ({ ...skill, level: '' })));
  };

  const handleInterestedSkillChange = (selectedOptions) => {
    setInterestedSkills(selectedOptions.map(skill => ({ ...skill, level: '' })));
  };

  const handleSkillLevelChange = (index, level, type) => {
    if (type === 'user') {
      const updatedSkills = [...userSkills];
      updatedSkills[index].level = level.value;
      setUserSkills(updatedSkills);
    } else if (type === 'interested') {
      const updatedSkills = [...interestedSkills];
      updatedSkills[index].level = level.value;
      setInterestedSkills(updatedSkills);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user) => {
        return makeRequest.put("/users", user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);
    }
  });

  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({ 
      ...texts, 
      coverPic: coverUrl, 
      profilePic: profileUrl, 
      userSkills: userSkills.map(skill => ({ skill: skill.value, level: skill.level })), 
      interestedSkills: interestedSkills.map(skill => ({ skill: skill.value, level: skill.level })) 
    });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
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
                    <img src={profile ? URL.createObjectURL(profile) : "./upload/" + user.coverPic} alt="" />
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
            <label className="update-form-label">Lozinka</label>
            <input
                type="text"
                value={texts.password}
                name="password"
                onChange={handleChange}
                className="update-form-input"
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
            <input
                type="text"
                name="town"
                value={texts.town}
                onChange={handleChange}
                className="update-form-input"
            />
            <label className="update-form-label">Preference učenja</label>
            <Select
                options={learningPrefOptions}
                value={learningPrefOptions.find(option => option.value === texts.learningPref)}
                onChange={(selectedOption) => setTexts((prev) => ({ ...prev, learningPref: selectedOption.value }))}
                styles={customStyles}
            />
            <label className="update-form-label">Primarna vještina</label>
            <Select
                options={transformedOptions}
                value={transformedOptions.flatMap(option => option.options).find(option => option.value === texts.primarySkill)}
                onChange={(selectedOption) => setTexts((prev) => ({ ...prev, primarySkill: selectedOption.value }))}
                styles={customStyles}
            />
            <label className="update-form-label">Nivo primarne vještine</label>
            <Select
                options={skillLevelOptions}
                value={skillLevelOptions.find(option => option.value === texts.primarySkillLevel)}
                onChange={(selectedOption) => setTexts((prev) => ({ ...prev, primarySkillLevel: selectedOption.value }))}
                styles={customStyles}
            />
            <label className="update-form-label">Vještine koje posjedujem</label>
            <Select
                isMulti
                options={transformedOptions}
                value={userSkills}
                onChange={handleSkillChange}
                styles={customStyles}
            />
            {userSkills.map((skill, index) => (
              <div key={index}>
                <label className="update-form-label">Nivo za {skill.label}</label>
                <Select
                  options={skillLevelOptions}
                  value={skillLevelOptions.find(option => option.value === skill.level)}
                  onChange={(selectedOption) => handleSkillLevelChange(index, selectedOption, 'user')}
                  styles={customStyles}
                />
              </div>
            ))}
            <label className="update-form-label">Vještine koje me interesuju</label>
            <Select
                isMulti
                options={transformedOptions}
                value={interestedSkills}
                onChange={handleInterestedSkillChange}
                styles={customStyles}
            />
            {interestedSkills.map((skill, index) => (
              <div key={index}>
                <label className="update-form-label">Nivo za {skill.label}</label>
                <Select
                  options={skillLevelOptions}
                  value={skillLevelOptions.find(option => option.value === skill.level)}
                  onChange={(selectedOption) => handleSkillLevelChange(index, selectedOption, 'interested')}
                  styles={customStyles}
                />
              </div>
            ))}
          </div>
        </form>
        <button className="profile-button" onClick={handleClick}>Ažuriraj</button>
      </div>
    </div>
  );
};

export default Update;
