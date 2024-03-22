import React, { useState } from 'react';
import './SkillsDirectory.css';

function SkillsDirectory() {
  //logika za više dugme, da se otvara svaki posebno
  const [showMore, setShowMore] = useState({
    Poslovanje: false,
    Kreativnost: false,
    Tehnologija: false,
    ZivotniStil: false,
  });

  const handleShowMore = (category) => {
    setShowMore(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const renderSkillsList = (skills, category) => (
    <>
      {skills.slice(0, showMore[category] ? skills.length : 5).map((skill, index) => (
        <li key={index}>{skill}</li>
      ))}
      <li>
        <button onClick={() => handleShowMore(category)} className="more-btn">
          {showMore[category] ? 'Manje' : 'Više'}
        </button>
      </li>
    </>
  );

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

  const categories = [ /*kategorije*/
    { name: 'Poslovanje', skills: poslovanjeSkills },
    { name: 'Kreativnost', skills: kreativnostSkills },
    { name: 'Tehnologija', skills: tehnologijaSkills },
    { name: 'Životni Stil', skills: zivotniStilSkills },
  ];

  return (
    <div className="skills-section">
      <h2>Istražite neke od vještina dostupnih na SkillSwap-u</h2>
      <div className="skills-categories">
        {categories.map((category, index) => (
          <div 
            key={index} 
            id={`category-${category.name.replace(/Životni Stil/g, 'Zivotni-Stil')}`} //preimenovano zbog korišćenja u css-u
            className={`category ${showMore[category.name] ? 'expanded' : ''}`} //expanded opcija za podešavanje visine bloka kada je proširen, zbog toga što
            //se dešavalo da se prilagode visini najvećeg što mi ne odgovara
          >
            <h3>{category.name}</h3>
            <ul>
              {renderSkillsList(category.skills, category.name)} {/*prikaz sadržaja*/}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsDirectory;
