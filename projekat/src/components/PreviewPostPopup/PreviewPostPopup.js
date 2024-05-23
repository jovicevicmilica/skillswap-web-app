import React from 'react';
import './PreviewPostPopup.css'; 
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import 'moment/locale/bs';

moment.locale('bs');

const PreviewPostPopup = ({ setIsPreviewPostPopupOpen, post }) => {
  const timeAgo = (date) => {
    return moment(date).fromNow();
  };

  return (
    <div className="preview-overlay">
      <div className="preview-content">
        <button className="preview-close-button" onClick={() => setIsPreviewPostPopupOpen(false)}>
          <CloseIcon />
        </button>
        <div className="post-details">
          <div className="user-info">
            <img src={"/upload/" + post.userProfile} alt="User Profile" className="user-profile-pic" />
            <div>
              <p className="user-name">{post.userName}</p>
              <p className="post-time">{timeAgo(post.createdAt)}</p>
            </div>
          </div>
          <p className="post-description">{post.desc}</p>
          {post.img ? (
            <img src={"/upload/" + post.img} alt="Post" className="post-image" />
          ) : (
            <p className="no-image">Nema slike</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PreviewPostPopup;
