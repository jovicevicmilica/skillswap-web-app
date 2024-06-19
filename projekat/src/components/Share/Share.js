import "./Share.css";
import UploadIcon from '@mui/icons-material/Upload';
import MapIcon from '@mui/icons-material/Map';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import SelectPopup from "../SelectPopup/SelectPopup";
import { toast, ToastContainer } from "react-toastify";

const Share = () => {
  //BLOK ZA OBJAVU NOVOG POST - A
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [popupType, setPopupType] = useState(null); //za kontrolu pop-up prozora (da li je za tag/mjesto)
  const [tags, setTags] = useState([]); //za čuvanje tagova
  const [place, setPlace] = useState(""); //za čuvanje mjesta

  const upload = async () => {
    try {
        /*pravimo formData da bi ga tako poslali api - ju*/
        const formData = new FormData();
        formData.append("file", file); 

        const res = await makeRequest.post("/upload", formData);
        return res.data; /*vraće taj url, tj. mi ga kasnije pretvaramo u URL, a dobijamo fajl i čuvamo ga u folderu*/
    } catch(err) {
        console.log(err);
    }
  };

  const {currentUser} = useContext(AuthContext); //dobijemo trenutnog korisnika, radi profilne slike i da bi se znalo ko kači objavu

  const queryClient = useQueryClient();

  /*sada pravimo mutaciju*/
  const mutation = useMutation({
    mutationFn: (newPost) => {
        /*šaljemo deskripciju i sliku, i ako je uspješno, možemo ponovo učitati akciju*/
        //tj. kačimo novu objavu
        return makeRequest.post("/posts", newPost);
    },
    onSuccess: () => {
      /*refreshujemo da bi mogli objaviti opet*/
      queryClient.invalidateQueries(['posts']);
    }
  });

  const handleClick = async (e) => {
    e.preventDefault();

    //validacija: ako nema ni slike ni opisa, ne dozvoljavamo objavu
    if (!file && desc.trim() === "") {
      toast.error("Objava mora sadržati sliku ili opis.");
      return;
    }

    let imgUrl = ""; /*na početku nemamo url, ako uploadujemo sliku dodaće se preko upload funkcije*/
    if(file) 
        imgUrl = await upload(); /*slika nam je url koji vratimo iz upload funkcije*/

    //formatiramo deskripciju da bude tag koji vodi na profil, plave boje
    const formattedDesc = tags.reduce((acc, tag) => {
      return acc.replace(`@${tag.label}`, `<a href="${tag.link}" class="no-underline" style="color: blue;">@${tag.label}</a>`);
    }, desc); 

    /*sada počinjemo koristiti react query mutacije*/
    mutation.mutate({ desc : formattedDesc, img: imgUrl, place }); /*pozivamo funkciju od gore sa našom objavom, koja je zapravo slika i opis*/

    /*refresh*/
    setDesc("");
    setFile(null);
    setTags([]);
    setPlace("");
  };

  const handleAddTag = (option) => {
    //ako nam je popup za friend, onda dodajemo tag na objavu
    if (popupType === 'friend') {
      const newTag = { //tag ima label, tj. ime korisnika, i link koji vodi do profila
        label: option.label,
        link: option.link || ''
      };
      setTags([...tags, newTag]); //postavimo tagove
      setDesc(desc + ` @${option.label}`); //pridodamo tag na deskripciju
    } else if (popupType === 'place') {
      setPlace(option.label); //ako je popup za place, dodajemo mjesto na objavu
    }
  };

  return (
    <div className="share">
      <div className="share-container">
        <div className="share-top">
          <div className="share-left">
            <img
                src={"/upload/" + currentUser.profilePic}
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
            <div className="share-item" onClick={() => setPopupType('place')}>
              <MapIcon />
              <span>Označi mjesto</span>
            </div>
            <div className="share-item" onClick={() => setPopupType('friend')}>
              <AlternateEmailIcon />
              <span>Označi kolegu</span>
            </div>
          </div>
          <div className="share-right">
            <button onClick={handleClick}>Podijeli</button>
          </div>
        </div>
        {place && <div className="share-place">Mjesto: {place}</div>} {/*dio za mjesto ide na dno*/}
      </div>
      {popupType && <SelectPopup type={popupType} closePopup={() => setPopupType(null)} addTag={handleAddTag} />}
      {/*provjeravamo je li odabran popup, ako jeste dodamo da se na closePopup zatvara, i dodamo funkciju koja radi nešto sa tim tagom/mjestom*/}
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Share;
