import React, { useState, useContext } from 'react';
import "./Login.css"
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify'; /*za alert poruke*/
import { useNavigate } from 'react-router';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
  //PRIJAVA
  const [inputs, setInputs] = useState({
    email:"",
    password:"",
  });

  const [showPassword, setShowPassword] = useState(false); //dodato stanje za prikaz lozinke

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => { //ako promijenimo nešto u input - u
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext); //uzimamo login iz AuthContext da bi mogli korisnika upisati u local storage

  const handleLogin = async (e) => {
    e.preventDefault(); /*da se stranica ne refreshuje*/
    try {
      const user = await login(inputs);
      if(user.email === "skillswap24@gmail.com") { //provjera je li admin ili nije, ako jeste, ide na admin - page
        navigate("/admin-page");
      } else {
        navigate("/home-page");
      }
    } 
    catch(err) {
      setErr(err.response.data);
      toast.error(err.response.data);
      return;
    }
  };

  return (
    <div className="login-outer">
        <div className="login-main">
            <div className="login-title"><h1 className="login-title-h1">Prijavite se</h1></div>
            <div className="login-inner">
                <div className="login-left">
                    <div className="login-text">
                        <h1>Dobrodošli u SkillSwap!</h1>        
                        <span>Nemate nalog?</span>
                        <a href="/register" className="log-reg-button">Registrujte se</a>
                    </div>
                </div>
                <div className="login-right">
                    <div className="login-forms">
                        <form className="login-form">
                            <div className="form-inner">
                                <label className="login-form-label">E-mail</label>
                                <input className="login-form-input"
                                type="email"
                                name="email"
                                placeholder="Unesite e-mail*"
                                required  
                                onChange={handleChange}                  
                                ></input>
                            </div>
                            <div className="form-inner">
                                <label className="login-form-label">Lozinka</label>
                                <div className="password-input-container">
                                  <input className="login-form-input" type={showPassword ? "text" : "password"} name="password" placeholder="Unesite lozinku*" required onChange={handleChange} />
                                  <div className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />} {/*vidi li se ili ne*/}
                                  </div>
                                </div>
                            </div>
                        </form>
                        <button type="submit" className="login-button" onClick={handleLogin}>Prijavi se</button> {/*dugme prijave*/}
                    </div>
                </div>
            </div>
        </div>
        <div className="black-block"></div>
    </div>
  );
}

export default Login;