import React from 'react';
import './Testimonials.css'; 
import man from '../../images/man.png';
import woman from '../../images/woman.png'; //avatari

const testimonials = [ /*ovako možemo lakše da ih dodajemo ili maknemo*/
  {
    quote: "Platforma za razmjenu vještina mi je otvorila vrata do novih znanja i iskustava. U zamjenu za moje lekcije sviranja gitare, naučio sam osnove programiranja koje su mi već pomogle u karijeri.",
    author: "Marko P, korisnik platforme", 
    avatar: man,
  },
  {
    quote: "Nikada nisam pomislila da mogu naučiti njemački jezik dok predajem jogu! Ovaj sajt mi je omogućio upravo to - razmjenu vještina sa fantastičnim ljudima. Naučila sam više nego što sam ikad očekivala, a zajednica je odlična.",
    author: "Ana D, korisnik platforme",
    avatar: woman,
  },
];

function Testimonials() {
  return (
    <div className="testimonials-section" id="testimonials">
      <h1 className="testimonials-header">Zašto korisnici vole našu platformu</h1>
      <p className="testimonials-description">Na SkillSwap-u, svako učenje je interakcija, a svaka vještina je valuta. 
         Prijavite se, postavite svoju ponudu i krenite u avanturu gdje se obrazovanje dešava na najpraktičniji i najzanimljiviji način.
      </p>
      <div className="testimonials-container">
        {testimonials.map((testimonial, index) => ( /*postavljamo u vidu quote-a*/
          <div key={index} className="testimonial">
            <blockquote>
                <p>“{testimonial.quote}”</p>
                <footer>—{testimonial.author} <img src={testimonial.avatar} className="avatar-photo" alt="Avatar" /></footer>
            </blockquote>
          </div>
        ))}
      </div>
      <div className="divider-section"></div>
    </div>
  );
}

export default Testimonials;
