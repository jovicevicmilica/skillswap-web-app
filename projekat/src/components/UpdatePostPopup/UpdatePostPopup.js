import React, { useState } from 'react';
import './UpdatePostPopup.css';
import CloseIcon from '@mui/icons-material/Close';
import { makeAdminRequest } from '../../axiosAdm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdatePostPopup = ({ setIsUpdatePostPopupOpen, post, onPostUpdated }) => {
  const [desc, setDesc] = useState(post.desc);
  const [img, setImg] = useState(null);

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await makeAdminRequest.post('/upload', formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (updatedPost) => {
      return makeAdminRequest.put(`/posts/${post.id}`, updatedPost);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['posts']);
      toast.success('Objava je uspješno ažurirana.');
      onPostUpdated(data.data); //data.data da bi pristupili baš direktnim podacima
      setIsUpdatePostPopupOpen(false);
    },
    onError: () => {
      toast.error('Greška prilikom ažuriranja objave.');
    }
  });

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = post.img; 
    if (img) {
      imgUrl = await upload(img);
    }

    const updatedPost = {
      desc,
      img: imgUrl,
    };

    mutation.mutate(updatedPost);
  };

  return (
    <div className="update-overlay">
      <div className="update-content">
        <h1>Ažuriraj objavu</h1>
        <button className="update-close-button" onClick={() => setIsUpdatePostPopupOpen(false)}>
          <CloseIcon />
        </button>
        <form>
          <div className="forms">
            <label className="update-form-label">Deskripcija</label>
            <input
              type="text"
              value={desc}
              name="desc"
              onChange={(e) => setDesc(e.target.value)}
              className="update-form-input"
            />
            <label className="update-form-label" htmlFor="img">
              <span>Slika</span>
              <div className="image-container-update">
                <img src={img ? URL.createObjectURL(img) : `/upload/${post.img}`} alt="" className="current-image" />
                <CloudUploadIcon />
              </div>
            </label>
            <input
              className="update-form-input"
              type="file"
              id="img"
              style={{ display: 'none' }}
              onChange={(e) => setImg(e.target.files[0])}
            />
            <button className="profile-button-update" onClick={handleClick}>Ažuriraj</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdatePostPopup;
