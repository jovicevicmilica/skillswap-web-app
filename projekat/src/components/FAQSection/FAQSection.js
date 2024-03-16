import React, { useState } from 'react';
import './FAQSection.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'; //strelica put dolje koju okrećemo za 180 da simulira otvaranje pitanja

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  {/*navodimo pitanja i odgovore*/}
  const faqs = [ 
    { question: "Šta je SkillSwap?", 
      answer: (
      <span>
        Saznajte više <a href="#about-section">o nama</a>. {/*span je da se ne bi pravio razmak kao kod paragrafa*/}
      </span> )},
    { question: "Kako se mogu registrovati na SkillSwap?", 
      answer: (
      <span>
        Registracija je jednostavna - potrebno je samo da popunite osnovne informacije o sebi, uključujući vještine koje posjedujete i one koje želite naučiti, kao i nekoliko personalnih informacija. Nakon toga, možete pretraživati zajednicu i tražiti savršenog partnera za razmjenu vještina. Registrujte se <a href="#central-box">ovdje</a> već sada.
      </span>
            ) },
    { question: "Kako funkcioniše razmjena vještina?", answer: "Kada pronađete nekog sa vještinama koje vas interesuju, možete započeti razmjenu tako što ćete kliknuti na opciju 'swap'. Ako druga strana prihvati, možete razmijeniti kontakte i nastaviti komunikaciju za dogovor o detaljima razmjene, bilo putem video poziva ili ličnog susreta."},
    { question: "Da li je SkillSwap plaćena usluga?", answer: "Ne, SkillSwap je potpuno besplatna platforma za razmjenu vještina. Naš cilj je omogućiti ljudima da uče jedni od drugih bez ikakvih troškova, a da istovremeno omogućimo zanimljiva upoznavanja."},
    { question: "Kako mogu ostaviti recenziju?", answer: "Nakon što se razmjena vještina završi, možete ostaviti recenziju o iskustvu s osobom s kojom ste sarađivali. To pomaže drugim korisnicima da donesu odluku o razmjeni i doprinosi pouzdanosti zajednice. Da ostavite recenziju, dovoljno je ući na profil osobe i kliknuti na 'Ostavi utiske'."},
    { question: "Šta ako naiđem na lažnu recenziju?", answer: "Ukoliko smatrate da je neka recenzija neistinita ili obmanjujuća, možete nas kontaktirati. Naš tim će pregledati slučaj i preduzeti odgovarajuće mjere kako bi očuvali integritet naše zajednice."}
  ];

  const toggleFAQ = index => {
    setActiveIndex(activeIndex === index ? null : index); /*da li je otvoreno*/
  };

  {/*podešavanja*/}
  return (
    <div className="faq-section">
      <h2>Često postavljena pitanja</h2>
      <div className="faq-container"> {/*div sa pitanjima i odgovorima*/}
        {faqs.map((faq, index) => (
          <div className={`faq-item ${activeIndex === index ? 'active' : ''}`} key={index}>
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <FontAwesomeIcon icon={faChevronDown} className={`fa-icon ${activeIndex === index ? 'open' : ''}`}/>
            </div>
            {activeIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
