import React from 'react';
import './PreviewPostPopup.css'; 
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import 'moment/locale/bs';
moment.locale('bs');

const PreviewPostPopup = ({ setIsPreviewPostPopupOpen, post }) => {
  //POPUP NA STRANI ADMINA KOJI OMOGUĆAVA DA PREGLEDAMO OBJAVU
  const timeAgo = (date) => {
    return moment(date).fromNow(); //koliko je vremena prošlo
  };

  //ovo radimo da admin ne bi mogao da klikne na profil, to može samo onaj ko je ulogovan kao korisnik
  //a ovako je lakše nego da mijenjam sve u share komponenti vezano za tag
  const sanitizeDescription = (desc) => {
      const tempDiv = document.createElement('div'); //napravimo div
      tempDiv.innerHTML = desc; //dodamo u njega deskripciju

      tempDiv.querySelectorAll('a').forEach(anchor => { //za svaki tag u tom div - u, mičemo href, da ne bi mogao da vodi na profil
          anchor.removeAttribute('href');
          anchor.style.color = 'blue';
          anchor.style.textDecoration = 'none';
      });

      return tempDiv.innerHTML;
  };

  return (
    <div className="preview-overlay">
      <div className="preview-content">
        <button className="preview-close-button" onClick={() => setIsPreviewPostPopupOpen(false)}>
          <CloseIcon /> {/*da zatvorimo popup*/}
        </button>
        <div className="post-details">
          <div className="user-info-post">
            <img src={"/upload/" + post.userProfile} alt="User Profile" className="user-profile-pic-post" />
            <div>
              <p className="user-name-post">{post.userName}</p>
              <p className="post-time">{timeAgo(post.createdAt)}</p>
            </div>
          </div>
          <p className="post-description" dangerouslySetInnerHTML={{ __html: sanitizeDescription(post.desc) }}></p>
          {/*opet postavljamo plavu deskripciju*/}
          {post.img ? (
            <img src={"/upload/" + post.img} alt="Post" className="post-image" />
          ) : (
            <p className="no-image">Nema slike</p> //ako nema slike, samo prikažemo da nema + opis
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PreviewPostPopup;
