import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './SkillsDirectory.css';

function SkillsDirectory() {
  //DIO GDJE SE GLEDAJU SVE VJEŠTINE PO KATEGORIJI
  const [openDropdown, setOpenDropdown] = useState(null); //da provjerimo je li dropdown spušen

  function toggleDropdown(category) { //category ide da bi znali za koju kategoriju je otvoren dropdown
    setOpenDropdown(openDropdown === category ? null : category);
  } 

  function renderSkills(skills) { //renderujemo vještine na osnovu ključa, za određeni ključ vraćemo skup vještina
    return skills.map(skill => (
      <button className="skill-tag" key={skill}>
        {skill}
      </button>
    ));
  }

  const poslovanjeSkills = [
    "Marketing", "Freelance", "Liderstvo", "Preduzetništvo", "Menadžment",
    "Trgovanje kriptovalutama", "Vođenje bloga", "Društveni mediji",
    "Finansije", "Microsoft Powerpoint", "Javni govor", "Tehnike prezentovanja",
    "Poslovna analitika", "Produktivnost", "Računovodstvo", "Vizualizacija podataka",
    "SEO", "Microsoft Excel",
  ];

  const kreativnostSkills = [
    "Crtanje", "Animiranje", "Grafički dizajn", "Slikanje", "Fotografija",
    "Videografija", "Web dizajn", "Kaligrafija", "2D animacije", "3D animacije",
    "3D dizajn", "3D modeliranje", "Dizajn karaktera", "Adobe alati", "Ilustracija", 
    "Crtanje", "Strip umjetnost", "Kreativno pisanje", "Pisanje tekstova", 
    "Moda", "Dizajn logotipa", "Uređivanje fotografija", "Dizajn korisničkog interfejsa",
    "Akvarel", "Pripovijedanje", "Pisanje poezije",
  ];

  const tehnologijaSkills = [
    "Dizajn igara", "Data science", "Razvoj web-a", "Upravljanje proizvodima",
    "Razvoj mobilnih aplikacija", "CSS", "Blockchain", "React", "HTML", "HTML5",
    "C programski jezik", "Python programski jezik", "C++ programski jezik", "Java programski jezik",
    "Javascript", "Webflow", "Wordpress",
  ];

  const zivotniStilSkills = [
    "Kulinarstvo", "E-sport i gaming", "Jezici", "Pekarstvo", "Trčanje", "Gimnastika",
    "Vezenje", "Heklanje", "Pletenje", "Šivenje", "Fitness i osobni trening", "Wellness i samopomoć",
    "Dizajn odjeće", "Dizajn enterijera", "Košarka", "Fudbal", "Tenis", "Odbojka",
    "Šminkanje", "Dizajn nakita",
  ];

  return (
    <div className="skills-section" id="skills-directory">
      <div className="skills-container">
        <div className="skills-section-inner">
          <div className="skills-categories">
            <div className="skills-header">Istražite neke od vještina dostupnih na SkillSwap-u:</div>
            <div className="skills-box">
              <div className="skill-box black">
                <div className="skill-heading">Kreativnost</div>
                <div className="skill-details">
                  <div className="skill-text">
                    <div>Razvijte svoje kreativne sposobnosti i otkrijte nove izražajne puteve. Kroz umjetnost, dizajn i inovativno razmišljanje, naša zajednica nudi prostor za usavršavanje vaših jedinstvenih talenata. Otključajte svoj kreativni potencijal i podijelite ga s svijetom.</div>
                  </div>
                  <button className="dropdown-box" onClick={() => toggleDropdown('Kreativnost')}> {/*otvaramo na klik*/}
                    <span className="dropdown-title">Istražite kreativne vještine</span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`dropdown-icon ${openDropdown === 'Kreativnost' ? 'rotate' : ''}`} //rotiramo ikonicu kad je otvoren/zatvoren
                    />
                  </button> 
                </div>
              </div>
              {openDropdown === 'Kreativnost' && ( //ako je dropdown otvoren, renderujemo vještine za njega
                <div className="skill-dropdown open">
                  {renderSkills(kreativnostSkills)}
                </div>
              )}
            </div>
            <div className="skills-box">
              <div className="skill-box">
                <div className="skill-heading">Poslovanje</div>
                <div className="skill-details">
                  <div className="skill-text">
                    <div>Unaprijedite svoje poslovne vještine i pogurajte svoju karijeru na novu razinu. Naučite o strategijama upravljanja, finansijama i poduzetništvu dok se povezujete s profesionalcima iz raznih industrija. Opremite se znanjem koje vodi ka uspjehu.</div>
                  </div>
                  <button className="dropdown-box" onClick={() => toggleDropdown('Poslovanje')}>
                    <span className="dropdown-title">Istražite poslovne vještine</span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`dropdown-icon ${openDropdown === 'Poslovanje' ? 'rotate' : ''}`}
                    />
                  </button> 
                </div>
              </div>
              {openDropdown === 'Poslovanje' && (
                <div className="skill-dropdown open">
                  {renderSkills(poslovanjeSkills)}
                </div>
              )}
            </div>
            <div className="skills-box">
              <div className="skill-box black">
                <div className="skill-heading">Tehnologija</div>
                <div className="skill-details">
                  <div className="skill-text">
                    <div>Ostanite na čelu tehnološkog napretka pridruživanjem našoj tehnološkoj zajednici. Istražite najnovije trendove u IT sektoru, naučite programiranje ili razvijte softverska rješenja. Pridružite se hackathonima, radionicama i grupnim projektima i postanite lider u digitalnoj revoluciji.</div>
                  </div>
                  <button className="dropdown-box" onClick={() => toggleDropdown('Tehnologija')}>
                    <span className="dropdown-title">Istražite tehnološke vještine</span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`dropdown-icon ${openDropdown === 'Tehnologija' ? 'rotate' : ''}`}
                    />
                  </button>
                </div>
              </div>
              {openDropdown === 'Tehnologija' && (
                <div className="skill-dropdown open">
                  {renderSkills(tehnologijaSkills)}
                </div>
              )}
            </div>
            <div className="skills-box">
              <div className="skill-box lightblue">
                <div className="skill-heading">Životni stil</div>
                <div className="skill-details">
                  <div className="skill-text">
                    <div>Obogatite svoj životni stil kroz zdrav život, lični razvoj i hobije. Naša platforma vam pruža resurse i podršku za sve aspekte vašeg života, od fitnessa i nutricionizma do osobnih interesa i hobija. Napravite promjene koje vode ka srećnijem i ispunjenijem životu.</div>
                  </div>
                  <button className="dropdown-box" onClick={() => toggleDropdown('Životni Stil')}>
                    <span className="dropdown-title black">Istražite životne vještine</span>
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`dropdown-icon black ${openDropdown === 'Životni Stil' ? 'rotate' : ''}`}
                    />
                  </button>
                </div>
              </div>
              {openDropdown === 'Životni Stil' && (
                <div className="skill-dropdown open">
                  {renderSkills(zivotniStilSkills)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillsDirectory;
