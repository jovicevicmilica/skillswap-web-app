import React, { useState, useRef } from 'react';
import './Contact.css';
import { Slide, toast, ToastContainer } from 'react-toastify'; /*za alert poruke*/
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"; /*znatno olakšava slanje HTTP zahtjeva*/
import ReCAPTCHA from 'react-google-recaptcha';

function Contact() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null); //za recaptchu
  const [isLoading, setIsLoading] = useState(false); //za loading bar
  const recaptchaRef = useRef(); /*zapamtimo recaptcha referencu da bi je kasnije vratili na to stanje*/

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
    axios.post("http://localhost:3001/send-email", { /*jer se poruke šalju meni, ide post*/
      email,
      subject,
      message, /*poruka se od ovih polja sastoji*/
    })
    .then(response => {
  	  setIsLoading(false);
      //provjerimo statusni kod, 200 je uspješan
      //resetujemo formu i ostalo nakon uspješnog slanja
      if (response.status === 200) {
        const savedEmails = JSON.parse(localStorage.getItem('emails')) || [];
        const updatedEmails = Array.from(new Set([email, ...savedEmails])).slice(0, 2); //posljednjih 3 mejla se čuvaju
        localStorage.setItem('emails', JSON.stringify(updatedEmails));
        localStorage.setItem('emails', JSON.stringify(updatedEmails));
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
        <ToastContainer transition={Slide} closeOnClick /> {/*aktiviramo toast sa slide tranzicijom koji se zatvara na klik*/}
        <div className="contact-container">
            <div className="contact-form">
                <form onSubmit={handleSubmit}> {/*onSubmit atribut je povezan sa handleSubmit funkcijom,
                koja se pokreće kad kliknemo pošalji*/}
                <div class="contact-form-header">
                    <h2>Imate pitanja?</h2>
                    <h2 className="contact-blue"> Kontaktirajte nas.</h2>
                </div>
                <p>Spremni da otkrijete kako SkillSwap može pomoći u razvoju vaše organizacije kroz razmjenu vještina i primjenu tehnologije? Kontaktirajte nas da zakažemo razgovor ili demonstraciju.</p>
                <div className="email-input-container">
                  <input
                    type="email"
                    name="email"
                    placeholder="Unesite e-mail*"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, 'email')} //realizacija key up and down
                    autocomplete="email"
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
                <p className="bottom-text">Jednostavno i besplatno nas obavijestite da ste zainteresovani da saznate više.</p>
                <ReCAPTCHA 
                  ref={recaptchaRef} /*postavimo je na referencu*/
                  sitekey="6Lc1BKQpAAAAAF5SgOg59OstzLMGK5vWtwpgRvGy" //dobijen sa oficijalnog sajta
                  onChange={(val) => setCaptchaValue(val)} 
                  style={{ marginBottom: '20px' }}
                /> {/*uključivanje recaptche*/}
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
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
      </div>
      <div className="black-block"></div>
    </div>
  );
};

export default Contact;
