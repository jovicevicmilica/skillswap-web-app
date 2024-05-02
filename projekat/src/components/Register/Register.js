import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import "./Register.css";
import Select from 'react-select';
import { Slide, toast, ToastContainer } from 'react-toastify'; /*za alert poruke*/
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

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
  control: (provided, state) => ({
    ...provided,
    border: '1px solid rgba(0, 0, 0, 0)', 
    color: '#000',
    backgroundColor: 'rgba(0, 69, 246, .1)',
    padding: '15px 15px 12px',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '1.42857',
    borderRadius: 0,
  }),
  menu: (provided, state) => ({
    ...provided,
    borderRadius: 0,
  }),
};

function Register() {
  const recaptchaRef = useRef();
  const [selectedSkill, setSelectedSkill] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [inputs, setInputs] = useState({
    name:"",
    email:"",
    password:"",
    primarySkill:""
  });

  const [err, setErr] = useState(null);

  const handleSkillChange = selectedOption => {
    const event = {
      target: {
        name: "primarySkill",
        value: selectedOption ? selectedOption.value : ""
      }
    };

    handleChange(event); /*da pozovemo i dio za inputs*/
    setSelectedSkill(selectedOption);
  };

  const handleTermsChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  const handleChange = e => {
    setInputs(prev => ({...prev, [e.target.name]:e.target.value}))
  };

  const handleSubmit = async e => {
    e.preventDefault(); /*jer ne refreshujemo stranicu*/
    if (!termsAccepted) {
      toast.error("Morate prihvatiti uslove korišćenja i politiku privatnosti.");
      return;
    }
    console.log('Forma poslata', { selectedSkill });

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
    }

    catch(err) {
      setErr(err.response.data);
      toast.error(err.response.data);
      return;
    }
  };

  return (
    <div className="register-outer">
        <div className="register-main">
            <div className="register-title"><h1 className="register-title-h1">Registrujte se</h1></div>
            <div className="register-inner">
                <div className="register-left">
                    <div className="register-text">
                        <h1>Dobrodošli u SkillSwap!</h1> 
                        <p>Registrujte se i budite dio zajednice koja raste svakim danom!</p>
                        <p>Otključajte pristup kursevima, radionicama i izvještajima znalaca i poboljšajte svoje vještine.</p>
                        <p>Vaša privatnost i sigurnost su nam na prvom mjestu.</p>
                        <span>Već imate nalog?</span>
                        <a href="/login" className="reg-log-button">Prijavite se</a>       
                    </div>
                </div>
                <div className="register-right">
                    <form className="register-form">
                        <div className="form-inner">
                            <label className="register-form-label">Ime i prezime</label>
                            <input className="register-form-input" type="text" name="name" placeholder="Unesite ime i prezime*" required onChange={handleChange} />
                        </div>
                        <div className="form-inner">
                            <label className="register-form-label">E-mail</label>
                            <input className="register-form-input" type="email" name="email" placeholder="Unesite e-mail*" required onChange={handleChange} />
                        </div>
                        <div className="form-inner">
                            <label className="register-form-label">Lozinka</label>
                            <input className="register-form-input" type="password" name="password" placeholder="Unesite lozinku*" required onChange={handleChange} />
                        </div>
                        <div className="form-inner">
                            <label className="register-form-label">Primarna vještina<span className="required-info"> (*nakon izvršene registracije možete mijenjati odabranu vještinu koju posjedujete i dodati nove, obavezno je odabrati jednu)</span></label>
                            <Select
                                styles={customStyles}
                                options={transformedOptions}
                                classNamePrefix="register-multiselect"
                                placeholder="Izaberite vještinu...*"
                                isClearable={true}
                                isSearchable={true}
                                name="primarySkill"
                                value={selectedSkill}
                                onChange={handleSkillChange}
                                required
                            />
                        </div>
                        <div className="register-checkbox-block">
                            <input type="checkbox" id="terms" checked={termsAccepted} onChange={handleTermsChange} className="register-checkbox"/>
                            <label htmlFor="terms">Prihvatam uslove korišćenja i politiku privatnosti*</label>
                        </div>
                        <div className="recaptcha-reg">
                            <ReCAPTCHA ref={recaptchaRef} sitekey="6Lc1BKQpAAAAAF5SgOg59OstzLMGK5vWtwpgRvGy" style={{ marginBottom: '20px' }} className="g-recaptcha-reg" />
                        </div>
                        <button type="submit" className="register-button" onClick={handleSubmit}>Registrujte se</button>
                    </form>
                </div>
            </div>
            <p className="skill-suggestion-text">
                Ako ne možete da pronađete željenu veštinu, molimo Vas da nas <a href="/contact" className="register-contact">kontaktirate</a>.
            </p>
        </div>
        <div className="black-block"></div>
    </div>
  );
}

export default Register;
