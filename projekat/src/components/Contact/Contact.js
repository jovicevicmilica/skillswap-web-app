import React, { useState, useRef } from 'react';
import './Contact.css';
import { Slide, toast, ToastContainer } from 'react-toastify'; /*za alert poruke*/
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"; /*znatno olakšava slanje HTTP zahtjeva*/
import ReCAPTCHA from 'react-google-recaptcha';

function Contact() {
  //KONTAKT
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState(''); //inputi, mail, predmet, poruka
  const [captchaValue, setCaptchaValue] = useState(null); //za recaptchu
  const [isLoading, setIsLoading] = useState(false); //za loading bar
  const recaptchaRef = useRef(); /*zapamtimo recaptcha referencu da bi je kasnije vratili na to stanje*/

  //da bi lakše prolazili kroz polja, klikom na arrow
  const handleKeyDown = (e, field) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault(); //zaustavimo defaultno ponašanje
      //ovdje ide logika za prelazak na sljedeće polje
      if (field === 'email') {
        document.querySelector('input[name="subject"]').focus(); //fokusira se na sljedeće
      } else if (field === 'subject') {
        document.querySelector('textarea[name="message"]').focus();
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      //logika za prelazak na prethodno polje
      if (field === 'message') {
        document.querySelector('input[name="subject"]').focus();
      } else if (field === 'subject') {
        document.querySelector('input[name="email"]').focus();
      }
    }
  };

  //poziva se prilikom slanja forme za slanje e-maila
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaValue) {
      toast.error("Molimo potvrdite da niste robot."); //ako kliknemo pošalji, a nismo obavili recaptchu
      return;
    }

    setIsLoading(true); //da bi realizovali ponovno korišćenje forme
    //ako je odgovor na reCAPTCHA validan, šalje se POST zahtjev na server sa unesenim podacima
    axios.post("http://localhost:8800/api/mails/send-email", { /*jer se poruke šalju meni, ide post*/
      //promijenjeno u api/mail jer sam odvojila server.js i mail.js, pa da mi server bude glavni, a mail samo za kontakt
      email,
      subject,
      message, /*poruka se od ovih polja sastoji*/
    })
    .then(response => {
  	  setIsLoading(false);
      //provjerimo statusni kod, 200 je uspješan
      //resetujemo formu i ostalo nakon uspješnog slanja
      if (response.status === 200) {
        setCaptchaValue(null);
        setEmail('');
        setSubject('');
        setMessage('');
         if (recaptchaRef.current) { /*da ne bi vraćalo error*/
          recaptchaRef.current.reset(); /*resetujemo recaptchu*/
        }
        toast.success("E-mail je uspješno poslat!"); //alert, u css-u ga stilizujem
      } else {
        //ako nije 200, onda greška
        throw new Error('Server je vratio grešku');
      }
    })
    .catch((error) => {
      setIsLoading(false);
      //ako axios uhvati grešku
      toast.error("Došlo je do greške prilikom slanja e-maila.");
      console.log(error);
    });
  };

  return (
    <div className="contact-positioner">
      <div className="outer-container"> {/*dodatni div za centriranje sadržaja unutar*/}
        <div className="contact-container">
            <div className="contact-form">
                <form onSubmit={handleSubmit}> {/*onSubmit atribut je povezan sa handleSubmit funkcijom,
                koja se pokreće kad kliknemo pošalji*/}
                <div className="contact-form-header">
                    <h2>Imate pitanja?</h2>
                    <h2 className="contact-blue"> Kontaktirajte nas.</h2>
                </div>
                <p>Ako imate tehnička pitanja ili ukoliko posjedujete vještinu koja bi bila od koristi zajednici, a nije već prisutna na našem spisku vještina, slobodno nas kontaktirajte putem donje forme. Vaša povratna informacija nam je od izuzetnog značaja. Hvala vam što ste dio naše zajednice!</p>
                <div className="email-input-container">
                  <input
                    type="email"
                    name="email"
                    placeholder="Unesite e-mail*"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, 'email')} //realizacija key up and down
                    autoComplete="email"
                  />
                </div>
                <input
                    type="text"
                    name="subject"
                    placeholder="Predmet e-maila*"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)} //analogno
                    onKeyDown={(e) => handleKeyDown(e, 'subject')}
                    autoComplete='off'
                />
                <textarea
                    name="message"
                    placeholder="Kako vam možemo pomoći?*"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, 'message')}
                ></textarea>
                <p className="bottom-text">Kontaktiranje je jednostavno, brzo i besplatno. Potrudićemo se da odgovorimo u što bržem roku!</p>
                <div className="recaptcha-container">
                  <ReCAPTCHA 
                    ref={recaptchaRef} /*postavimo je na referencu*/
                    sitekey="6Lc1BKQpAAAAAF5SgOg59OstzLMGK5vWtwpgRvGy" //dobijen sa oficijalnog sajta
                    onChange={(val) => setCaptchaValue(val)} 
                    style={{ marginBottom: '20px' }}
                    className="g-recaptcha"
                  /> {/*uključivanje recaptche*/}
                </div>
                <button disabled={isLoading} type="submit">{isLoading ? 'Šaljem...' : 'Pošalji'}</button> {/*dugme pošalji*/}
            </form>
            </div>
            <div className="contact-map"> {/*gugl mapa sa sajta google maps*/}
                {/*embedovana mapa sa sajta, automatski napravljen kod, samo izmijenjen stil*/}
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39809.41390992996!2d19.247187293277435!3d42.438703914894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134deb30477e9f4b%3A0x90e074747e61d54d!2zODggQnVsZXZhciBTdmV0b2cgUGV0cmEgQ2V0aW5qc2tvZywgUG9kZ29yaWNhLCDQptGA0L3QsCDQk9C-0YDQsA!5e0!3m2!1ssr!2s!4v1711224922379!5m2!1ssr!2s"
                    //da bi se odaljila/približila na mapi (stalni izgled) neophodno je da to uradimo direktno na mapi
                    //onda na sajtu možemo da približavamo i udaljavamo, to se samo postavi
                    title="SkillSwap Location Map" //deskripcija
                    width="550" 
                    height="650" 
                    style={{ border: "0" }}
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
      </div>
      <div className="black-block"></div>
    </div>
  );
};

export default Contact;
