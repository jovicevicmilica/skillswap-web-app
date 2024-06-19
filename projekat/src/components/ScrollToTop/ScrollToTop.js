import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  //DA NAS VRAĆE NA VRH STRANICE TOKOM PRELAZA
  const { pathname } = useLocation();

  useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth' //da bi prelaz bio ljepši, da nas vrati na vrh kada prelazimo između stranica
  });
}, [pathname]);

  return null;
}

export default ScrollToTop;
