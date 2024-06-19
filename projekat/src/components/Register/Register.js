import React, { useState, useRef, useContext } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import "./Register.css";
import Select from 'react-select';
import { Slide, toast, ToastContainer } from 'react-toastify'; /*za alert poruke*/
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from 'react-router';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { AuthContext } from '../../context/authContext';

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

//provjera e - maila
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

function Register() {
  //REGISTRACIJA
  const recaptchaRef = useRef(); //referenca za reCAPTCHA - u
  const [selectedSkill, setSelectedSkill] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [inputs, setInputs] = useState({
    name:"",
    email:"",
    password:"",
    primarySkill:""
  });

  const [showPassword, setShowPassword] = useState(false); //dodato stanje za prikaz lozinke, da li je otkrivena ili sakrivena

  const navigate = useNavigate(); 
  const [err, setErr] = useState(null);
  const { login } = useContext(AuthContext); //uzimamo login iz AuthContext - a, da nakon registracije unesemo korisnika u local storage

  const handleSkillChange = selectedOption => { //promijenimo primatnu vještinu
    const event = {
      target: {
        name: "primarySkill",
        value: selectedOption ? selectedOption.value : ""
      }
    };

    handleChange(event); /*da pozovemo i dio za inputs*/
    setSelectedSkill(selectedOption);
  };

  const handleTermsChange = () => { //da li su uslovi prihvaćeni ili ne
    setTermsAccepted(!termsAccepted);
  };

  const handleChange = e => { //promjena u select - u
    setInputs(prev => ({...prev, [e.target.name]:e.target.value}))
  };

  const handleSubmit = async e => { //da se registrujemo
    e.preventDefault(); /*jer ne refreshujemo stranicu*/
    if (!termsAccepted) {
      toast.error("Morate prihvatiti uslove korišćenja i politiku privatnosti.");
      return;
    }

    //validacija mejla
    if (!isValidEmail(inputs.email)) {
      toast.error("Unesite validan e-mail.");
      return;
    }

    //validacija dužine lozinke
    if (inputs.password.length < 8) {
      toast.error("Lozinka mora biti duža od 8 karaktera.");
      return;
    }

    console.log('Forma poslata', { selectedSkill });

    try {
      const response = await axios.post("http://localhost:8800/api/auth/register", inputs);
      toast.success("Uspješno ste se registrovali!");
      await login({ email: inputs.email, password: inputs.password }); 
      //da se automatski ulogujemo poslije registracije, a ne da idemo na login
      navigate("/home-page");
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
                            <div className="password-input-container">
                              <input className="register-form-input" type={showPassword ? "text" : "password"} name="password" placeholder="Unesite lozinku*" required onChange={handleChange} />
                              <div className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </div>
                            </div>
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
                        <div className="recaptcha-reg"> {/*postavimo reCAPTCHA - u na osnovu ključa*/}
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
