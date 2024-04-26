import React, { useState, useRef, useContext } from 'react';
import "./Login.css"
import ReCAPTCHA from 'react-google-recaptcha';
import { AuthContext } from '../../context/authContext';

function Login() {
  const recaptchaRef = useRef(); /*zapamtimo recaptcha referencu da bi je kasnije vratili na to stanje*/
  const {login} = useContext(AuthContext);
  const handleLogin = () => {
    login();
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
                                ></input>
                            </div>
                            <div className="form-inner">
                                <label className="login-form-label">Lozinka</label>
                                <input className="login-form-input"
                                type="password"
                                name="password"
                                placeholder="Unesite lozinku*"
                                required                
                                ></input>
                            </div>
                            <div className="login-checkbox-block">
                                <input type="checkbox" id="remember" name="remember" className="login-checkbox"></input>
                                <label for="remember" className="login-remember">Zapamti me</label>
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

export default Login