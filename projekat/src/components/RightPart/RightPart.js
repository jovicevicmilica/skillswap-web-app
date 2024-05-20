import React from 'react'
import './RightPart.css';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const RightPart = () => {
  return (
    <div className="right-part">
      <div className="rp-container">
        <div className="rp-item">
          <span>Zahtjevi za razmjenu</span>
          <div className="rp-user">
            <div className="rp-user-info">
              <img src="https://static2yumama.mondo.rs/Picture/70355/jpeg/Dete-ridja-kosa-crvena-kosa_700288018.jpg?ts=2022-12-28T13:12:32" alt="" />
              <span>Nikolina Todorović</span>
            </div>
            <div className="rp-buttons">
              <button className="rp-button"><CheckCircleIcon className="icon-color-blue"/></button>
              <button className="rp-button"><CancelIcon /></button>
            </div>
          </div>
          <div className="rp-user">
            <div className="rp-user-info">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Puma_face.jpg/1200px-Puma_face.jpg" alt="" />
              <span>Milena Janković</span>
            </div>
            <div className="rp-buttons">
              <button className="rp-button"><CheckCircleIcon className="icon-color-blue" /></button>
              <button className="rp-button"><CancelIcon /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightPart;