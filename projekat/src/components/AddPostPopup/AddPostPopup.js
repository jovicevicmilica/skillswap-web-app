import React, { useState, useEffect } from 'react';
import './AddPostPopup.css';
import CloseIcon from '@mui/icons-material/Close';
import { makeAdminRequest } from '../../axiosAdm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPostPopup = ({ setIsAddPostPopupOpen, onPostAdded }) => {
  //POPUP ZA DODAVANJE OBJAVE, ADMIN
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); //za kojeg korisnika dodajemo objavu

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await makeAdminRequest.get('/users'); //da dobijemo sve korisnike
        setUsers(response.data); //postavimo sve korisnike, kako bi mogli da biramo za kojeg ćemo da postavimo obajvu
      } catch (error) {
        console.error('Greška pri dobijanju korisnika:', error);
      }
    };

    fetchUsers();
  }, []);

  const upload = async (file) => {
    try {
      const formData = new FormData(); //kreiramo formu na koju dodajemo fajl
      formData.append('file', file);
      const res = await makeAdminRequest.post('/upload', formData); //upload postavlja taj fajl u folder, i vraće nam ga, da bismo generisali URL
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) => {
      return makeAdminRequest.post('/posts', newPost); //dodajemo objavu
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['posts']); //refreshujemo
      toast.success('Objava je uspješno dodata.');
      console.log(data.data);
      onPostAdded(data.data); //označavamo dodati post
      setIsAddPostPopupOpen(false); //gasimo dropdown
    },
    onError: () => {
      toast.error('Greška prilikom dodavanja objave.');
    }
  });

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl;
    if (img) {
      imgUrl = await upload(img); //ako je slika odabrana, postavi se, inače bude bez slike
    }

    const newPost = {
      desc,
      img: imgUrl,
      userId: selectedUser ? selectedUser.value : null, //ukoliko nije null, koristimo mu vrijednost
      createdAt: new Date()
    };

    mutation.mutate(newPost);
  };

  const customStyles = { //stilovi za select
    control: (provided) => ({
      ...provided,
      border: '1px solid rgba(0, 0, 0, 0)',
      color: '#000',
      backgroundColor: 'rgba(0, 69, 246, .1)',
      padding: '5px 5px 5px',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '1.42857',
      borderRadius: 0,
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: 0,
    }),
  };

  return (
    <div className="add-overlay">
      <div className="add-content">
        <h1>Dodaj objavu</h1>
        <button className="add-close-button" onClick={() => setIsAddPostPopupOpen(false)}>
          <CloseIcon />
        </button>
        <form>
          <div className="forms">
            <label className="add-form-label">Deskripcija</label>
            <input
              type="text"
              value={desc}
              name="desc"
              onChange={(e) => setDesc(e.target.value)}
              className="add-form-input"
            />
            <label className="add-form-label">Korisnik</label>
            <Select
              className="add-form-select"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e)}
              options={users.map(user => ({ value: user.id, label: `${user.name} (${user.id})` }))}
              styles={customStyles}
              placeholder="Odaberite korisnika"
            />
            <label className="add-form-label" htmlFor="img">
              <span>Slika</span>
              <div className="image-container-add">
                <img src={img ? URL.createObjectURL(img) : null} alt="" />
                <CloudUploadIcon />
              </div>
            </label>
            <input
              className="add-form-input"
              type="file"
              id="img"
              style={{ display: 'none' }}
              onChange={(e) => setImg(e.target.files[0])}
            />
            <button className="profile-button-add" onClick={handleClick}>Dodaj</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddPostPopup;
