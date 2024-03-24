import React, { useState } from 'react';
import './Contact.css';
import { Slide, toast, ToastContainer } from 'react-toastify'; /*za alert poruke*/
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"; /*znatno olakšava slanje HTTP zahtjeva*/

function Contact() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/send-email", { /*jer se poruke šalju meni, ide post*/
      email,
      subject,
      message, /*poruka se od ovih polja sastoji*/
    })
    .then(response => {
      //provjerimo statusni kod, 200 je uspješan
      if (response.status === 200) {
        toast.success("E-mail je uspješno poslat!"); //alert, u css-u ga stilizujem
      } else {
        //ako nije 200, onda greška
        throw new Error('Server je vratio grešku');
      }
    })
    .catch((error) => {
      //ako axios uhvati grešku
      toast.error("Došlo je do greške prilikom slanja e-maila.");
    });
  };

  return (
    <div className="outer-container"> {/*dodatni div za centriranje sadržaja unutar*/}
        <ToastContainer transition={Slide} closeOnClick /> {/*aktiviramo toast sa slide tranzicijom koji se zatvara na klik*/}
        <div className="contact-container">
            <div className="contact-form">
                <form onSubmit={handleSubmit}> {/*onSubmit atribut je povezan sa handleSubmit funkcijom,
                koja se pokreće kad kliknemo pošalji*/}
                <div class="contact-form-header">
                    <h2>Imate pitanja?</h2>
                    <h2> Kontaktirajte nas.</h2>
                </div>
                <p>Spremni da otkrijete kako SkillSwap može pomoći u razvoju vaše organizacije kroz razmjenu vještina i primjenu tehnologije? Kontaktirajte nas da zakažemo razgovor ili demonstraciju.</p>
                <input
                    type="email"
                    placeholder="Unesite e-mail*" //ovo piše dok se ne unese e-mail
                    required //neophodno polje
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} //value i onChange atributi povezuju vrijednost polja sa email state promenljivom u react komponenti
                />
                <input
                    type="text"
                    placeholder="Predmet e-maila*"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)} //analogno
                />
                <textarea
                    placeholder="Kako vam možemo pomoći?*"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <p className="bottom-text">Jednostavno i besplatno nas obavijestite da ste zainteresovani da saznate više.</p>
                <button type="submit">Pošalji</button> {/*dugme pošalji*/}
            </form>
            </div>
            <div className="contact-map"> {/*gugl mapa sa sajta google maps*/}
                {/*embedovana mapa sa sajta, automatski napravljen kod, samo izmijenjen stil*/}
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39809.41390992996!2d19.247187293277435!3d42.438703914894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134deb30477e9f4b%3A0x90e074747e61d54d!2zODggQnVsZXZhciBTdmV0b2cgUGV0cmEgQ2V0aW5qc2tvZywgUG9kZ29yaWNhLCDQptGA0L3QsCDQk9C-0YDQsA!5e0!3m2!1ssr!2s!4v1711224922379!5m2!1ssr!2s"
                    //da bi se odaljila/približila na mapi (stalni izgled) neophodno je da to uradimo direktno na mapi
                    //onda na sajtu možemo da približavamo i udaljavamo, to se samo postavi
                    width="550" 
                    height="600" 
                    style={{ border: "0" }}
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    </div>
  );
};

export default Contact;
