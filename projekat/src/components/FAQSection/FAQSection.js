import React, { useState } from 'react';
import './FAQSection.css'; 

const FAQSection = () => {
  //PITANJA I ODGOVORI
  const [activeIndex, setActiveIndex] = useState(null); //je li otvoreno pitanje ili ne

  {/*navodimo pitanja i odgovore*/}
  const faqs = [ 
    { question: "Šta je SkillSwap?", 
      answer: (
      <span>
        SkillSwap je online platforma koja omogućava korisnicima da razmjenjuju vještine i znanja. Na primjer, neko ko zna svirati gitaru može ponuditi časove u zamjenu za časove programiranja. Korisnici se registruju, postavljaju svoje vještine i pretražuju druge korisnike sa vještinama koje ih zanimaju. {/*span je da se ne bi pravio razmak kao kod paragrafa*/}
      </span> )},
    { question: "Kako se mogu registrovati na SkillSwap?", 
      answer: (
      <span>
        Registracija je jednostavna - potrebno je samo da popunite osnovne informacije o sebi, uključujući vještine koje posjedujete i one koje želite naučiti, kao i nekoliko personalnih informacija. Nakon toga, možete pretraživati zajednicu i tražiti savršenog partnera za razmjenu vještina. Registrujte se <a href="/register">ovdje</a> već sada.
      </span>
            ) },
    { question: "Kako funkcioniše razmjena vještina?", answer: "Kada pronađete nekog sa vještinama koje vas interesuju, možete započeti razmjenu tako što ćete kliknuti na opciju 'Zatraži razmjenu'. Ako druga strana prihvati, automatski dobijate njihovu e-mail adresu u porukama, kako bi mogli nastaviti komunikaciju o detaljima razmjene, bilo putem video poziva ili ličnog susreta."},
    { question: "Da li je SkillSwap plaćena usluga?", answer: "Ne, SkillSwap je potpuno besplatna platforma za razmjenu vještina. Naš cilj je omogućiti ljudima da uče jedni od drugih bez ikakvih troškova, a da istovremeno omogućimo zanimljiva upoznavanja."},
    { question: "Šta ako sam izabrao pogrešnu vještinu?", answer: "Ne brinite, promjena vještine je izuzetno laka. Na početku birate samo primarnu vještinu, a nakon registracije možete mijenjati i nju, kao i njen nivo, i dodati do dvije druge vještine koje posjedujete, i do tri vještine koje imate, zajedno sa nivoom. Možete ih promijeniti u bilo kom trenutku."},
    { question: "Šta ako naiđem na lažan profil?", 
      answer: (
      <span>
        Ukoliko smatrate da je neki profil lažan ili obmanjujući, možete nas <a href="/contact">kontaktirati</a>. Naš tim će pregledati slučaj i preduzeti odgovarajuće mjere kako bi očuvali integritet naše zajednice. Moguće je prijaviti profil direktno, kao i objave.
      </span>
      ) },
  ];

  const toggleFAQ = index => { //da li je otvoren, i koji
    setActiveIndex(activeIndex === index ? null : index); /*da li je otvoreno*/
  };

  {/*podešavanja*/}
  return (
    <div className="faq-section" id="faq">
      <div className="faq-header-block">
        <h1 className="faq-header">Često postavljena pitanja</h1>
        <p className="faq-description">Ako ste novi na SkillSwap-u ili želite poboljšati iskustvo prilikom korišćenja našeg sajta, ovaj vodič će vam pomoći da saznate više o našoj platformi i dobijete odgovore na potencijalna pitanja.</p>
      </div>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div className={`faq-item ${activeIndex === index ? 'active' : ''}`} key={index}>
            <div className="faq-question-title" onClick={() => toggleFAQ(index)}>
              <h2 className="faq-question">{faq.question}</h2>
              <button className="faq-toggle">
                {activeIndex === index ? '-' : '+'} {/*ako je aktivan ide minus, inače plus*/}
              </button>
            </div>
            <div className="faq-answer" style={{ display: activeIndex === index ? 'block' : 'none' }}>
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;