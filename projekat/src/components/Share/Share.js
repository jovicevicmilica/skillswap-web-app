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

  const upload = async () => {
    try {
        /*pravimo formData da bi ga tako poslali api - ju*/
        const formData = new FormData();
        formData.append("file", file); 

        const res = await makeRequest.post("/upload", formData);
        console.log("Upload response:", res.data);
        return res.data; /*vraće taj url*/
    } catch(err) {
        console.log(err);
    }
  };

  const {currentUser} = useContext(AuthContext);

  const queryClient = useQueryClient();

  /*sada pravimo mutaciju*/
  const mutation = useMutation({
    mutationFn: (newPost) => {
        /*šaljemo deskripciju i sliku, i ako je uspješno, možemo ponovo učitati akciju*/
            return makeRequest.post("/posts", newPost);
    },
    onSuccess: () => {
      /*refreshujemo da bi mogli objaviti opet*/
      queryClient.invalidateQueries(['posts']);
    }
  });

  const handleClick = async (e) => {
    e.preventDefault();

    let imgUrl = ""; /*na početku nemamo url, ako uploadujemo sliku dodaće se preko upload funkcije*/
    if(file) 
        imgUrl = await upload(); /*slika nam je url koji vratimo iz upload funkcije*/

    /*sada počinjemo koristiti react query mutacije*/
    mutation.mutate({ desc, img: imgUrl }); /*pozivamo funkciju od gore sa našom objavom, koja je zapravo slika i opis*/

    /*refresh*/
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="share-container">
        <div className="share-top">
          <div className="share-left">
            <img
                src={currentUser.profilePic}
                alt=""
            />
            <input type="share-text" placeholder={`Šta želite podijeliti, ${currentUser.name}?`} 
                onChange={e => setDesc(e.target.value)} 
                value={desc}
            />
          </div>    
          <div className="share-right">
            { file && <img className="file" alt="" src={URL.createObjectURL(file)} /> }
            {/*ovo kreiramo da bi nam se pojavila mala ikonica naše slike kad uploadujemo fajl, da znamo da smo nešto odabrali*/}
          </div>
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