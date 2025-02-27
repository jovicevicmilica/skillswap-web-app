import React, { useState, useEffect } from 'react';
import './ScrollToTopArrow.css'; 

const ScrollToTopArrow = () => {
  //STRELICA KOJA NAS POSLIJE ODREĐENE VISINE VRAĆE NA POČETAK
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      //strelicu ne prikazujemo kada smo na vrhu stranice, jer nam tada nije potrebna
      if (!showScroll && window.pageYOffset > 500) { //kada predjemo visinu 500, prikažemo je
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 500) { //inače je ne prikazujemo
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'}); //da bi se na fin način 'popelo' gore
  };

  return (
    <div className="scrollTop" onClick={scrollTop} style={{display: showScroll ? 'flex' : 'none'}}>
      {/*ovdje ide strelica koju pravimo u css - u, pa se ovdje nista ne pise*/}
    </div>
  );
};

export default ScrollToTopArrow;
