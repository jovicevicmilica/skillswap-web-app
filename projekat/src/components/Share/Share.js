import "./Share.css";
import UploadIcon from '@mui/icons-material/Upload';
import MapIcon from '@mui/icons-material/Map';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import axios from "axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const {currentUser} = useContext(AuthContext);

  const queryClient = useQueryClient();

  /*sada pravimo mutaciju*/
  const mutation = useMutation({
    mutationFn: (newPost) => {
        /*šaljemo deskripciju i sliku, i ako je uspješno, možemo ponovo učitati akciju*/
        const formData = new FormData();
        formData.append('desc', newPost.desc);
        if (newPost.file) {
        formData.append('file', newPost.file);
        }
        return makeRequest.post("/home-page/posts", newPost);
    },
        onSuccess: () => {
            /*refreshujemo da bi mogli objaviti opet*/
            queryClient.invalidateQueries(['posts']);
        }
    });

  const handleClick = e => {
    e.preventDefault();
    /*sada počinjemo koristiti react query mutacije*/
    mutation.mutate({desc}) /*pozivamo funkciju od gore sa našom objavom, koja je zapravo slika i opis*/
  };
  return (
    <div className="share">
      <div className="share-container">
        <div className="share-top">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <input type="share-text" placeholder={`Šta želite podijeliti, ${currentUser.name}?`} 
            onChange={e => setDesc(e.target.value)} 
          />
        </div>
        <hr />
        <div className="share-bottom">
          <div className="share-left">
            <input 
                type="file" 
                id="file"   
                style={{display:"none"}} 
                onChange={e => setFile(e.target.files[0])}  /*ide ovako jer dodajemo jedan fajl, pa files[0]*/
            />
            <label htmlFor="file">
              <div className="share-item">
                <UploadIcon />
                <span>Dodaj sliku</span>
              </div>
            </label>
            <div className="share-item">
              <MapIcon />
              <span>Označi mjesto</span>
            </div>
            <div className="share-item">
              <AlternateEmailIcon />
              <span>Označi kolegu</span>
            </div>
          </div>
          <div className="share-right">
            <button onClick={handleClick}>Podijeli</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;