import { React, useContext, useState, useEffect } from 'react';
import './Post.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Link } from 'react-router-dom';
import Comments from '../Comments/Comments';
import moment from "moment";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { toast } from 'react-toastify'; 
import { AuthContext } from '../../context/authContext';

const Post = ({ post }) => {
  //OBJAVA KORISNIKA
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const {currentUser} = useContext(AuthContext); //dobijamo trenutnog korisnika iz AuthContext - a, koji vadi iz local storage

  const queryClient = useQueryClient(); //za kolačiće, dohvatanje podataka, upravljanje zahtjevima

  const { isLoading, error, data } = useQuery({
    queryKey: ['home-page/likes', post.id], //jedinstveni ključ koji identifikuje podatke u kešu
    queryFn: () => makeRequest.get("/likes?postId=" + post.id).then(res => res.data) //izvršavamo HTTP zahtjev za dohvatanje objava, data nam je broj lajkova na objavi
  });

  //analogno, dohvatanje broja komentara za objavu
  const { data: commentCountData } = useQuery({
    queryKey: ['home-page/comment-count', post.id],
    queryFn: () => makeRequest.get("/comments/count?postId=" + post.id).then(res => res.data),
    initialData: 0 //postavljanje početne vrijednosti
  });

  //useQuery se koristi za dohvatanje, za mijenjanje već idu mutacije, kao i dodavanje, brisanje
  const mutation = useMutation({ //mutacija ide kada naizmjenično radimo nešto, tj. pozivamo neki zahtjev, nešto mijenjamo
    mutationFn: (liked) => { //ako je lajkovan, mičemo lajk, inače lajkujemo
      if(liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", {postId: post.id});
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['likes']);
    }
  });

  //mutacija za brisanje objave na osnovu ID
  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      return makeRequest.delete("/posts/" + post.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    }
  });

  useEffect(() => { //da lakše zatvorimo opciju obriši/prijavi klikom bilo gdje pored
    const closeMenu = (e) => {
        if (!e.target.closest('.post')) {
            setMenuOpen(false);
        }
    };

    if (menuOpen) {
        document.addEventListener('click', closeMenu); //ako je otvoren dodamo event listener koji nam to omogućava
    }

    return () => {
        document.removeEventListener('click', closeMenu); //inače ga mičemo
    };
  }, [menuOpen]);

  if (isLoading) {
    return <div>Učitavam...</div>;
  }

  if (error) {
    toast.error(`Desila se greška: ${error.message}`);
    return <div>Greška: {error.message}</div>;
  }

  //sada pozivamo mutacije, tj. one mutiraju na određeni klik/akciju
  const handleLike = () => {
    /*provjeravamo da li je već lajkovano, jer inače ide dislajk*/
    mutation.mutate(data.includes(currentUser.id)); /*ovo je ili true ili false, dakle biće ili lajk ili dislajk*/
  };

  const handleDelete = () => {
    deleteMutation.mutate(post.id); //na klik obriši, brišemo objavu sa tim id - jem
  };

  const reportPost = () => { //klikom na prijavi, šaljemo mejl prijave
    const mailto = `mailto:skillswap24@gmail.com?subject=Prijava objave ID: ${post.id}&body=Poštovani,%0D%0A%0D%0AŽelim da prijavim objavu sa sljedećim detaljima:%0D%0A%0D%0AID objave: ${post.id}%0D%0AOpis objave: ${encodeURIComponent(post.desc)}%0D%0A%0D%0AMolim vas da preduzmete potrebne mjere.%0D%0A%0D%0AHvala vam,%0D%0A${currentUser.name}`;
    window.location.href = mailto; //da preusmjerimo prozor na podrazumijevani email klijent sa sadržajem mailto
  };

  return (
    <div className="post">
        <div className="post-container">
            <div className="post-user">
                <div className="post-user-info">
                    <img src={"/upload/" + post.profilePic} alt="" />
                    <div className="post-details">
                        <Link to={`/home-page/profile/${post.userId}`} style={{textDecoration:"none", color:"inherit"}}> 
                            <span className="post-name">{post.name}</span>
                        </Link>
                        <span className="post-date">{moment(post.createdAt).fromNow()}</span> {/*koristimo moment.fromNow() da provjerimo koliko je vremena prošlo od dodavanja objave*/}
                    </div>
                </div>
                <MoreHorizIcon onClick={()=>setMenuOpen(!menuOpen)} />
                {menuOpen && (
                  post.userId === currentUser.id ?
                    (<button onClick={handleDelete} className="post-delete">Obriši objavu</button>) :
                    (<button onClick={reportPost} className="post-delete">Prijavi objavu</button>) //ukoliko je tuđa objava, ide report umjesto brisanja
                )}
            </div>  
            <div className="post-content">
                <p dangerouslySetInnerHTML={{ __html: post.desc }}></p> {/*koristimo dangerouslySetInnerHTML za prikaz HTML - a*/}
                <img src={"/upload/" + post.img} alt="" /> {/*da bi prikazali slike iz foldera upload*/}
                {post.place && <div className="post-place" style={{ color: "grey" }}>Mjesto: {post.place}</div>}
            </div>
            <div className="post-info">
                <div className="post-item">
                    {data.includes(currentUser.id) ? (<FavoriteIcon className="icon-color-blue" onClick={handleLike}/>) : (<FavoriteBorderIcon onClick={handleLike}/>)}
                    {data.length} lajkova
                </div>
                <div className="post-item" onClick={()=>setCommentOpen(!commentOpen)}>
                  <AddCommentIcon />
                  {commentCountData !== undefined ? `${commentCountData} komentara` : '0 komentara'}
                </div>
            </div>
            {commentOpen && <Comments postId={post.id} />} {/*da li će se prikazati komentari za određenu objavu*/}
        </div>
    </div>
  )
}

export default Post;