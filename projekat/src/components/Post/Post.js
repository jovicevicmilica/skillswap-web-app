import { React, useContext, useState } from 'react';
import './Post.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';
import Comments from '../Comments/Comments';
import moment from "moment";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { toast } from 'react-toastify'; // for alert messages
import { AuthContext } from '../../context/authContext';

const Post = ({post}) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const {currentUser} = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (liked) => {
        if(liked) return makeRequest.delete("/likes?postId=" + post.id);

        return makeRequest.post("/likes", {postId: post.id});
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['likes']);
    }
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ['home-page/likes', post.id],
    queryFn: () => makeRequest.get("/likes?postId=" + post.id).then(res => res.data)
  });

  if (isLoading) {
    toast.info("Lajk se učitava!");
    return <div>Učitavam...</div>;
  }

  if (error) {
    toast.error(`Desila se greška: ${error.message}`);
    return <div>Greška: {error.message}</div>;
  }

  const handleLike = async (e) => {
    /*provjeravamo da li je već lajkovano, jer inače ide dislajk*/
    mutation.mutate(data.includes(currentUser.id)); /*ovo je ili true ili false, dakle biće ili lajk ili dislajk*/
  };

  return (
    <div className="post">
        <div className="post-container">
            <div className="post-user">
                <div className="post-user-info">
                    <img src={post.profilePic} alt="" />
                    <div className="post-details">
                        <Link to={`/profile/${post.userId}`} style={{textDecoration:"none", color:"inherit"}}> 
                            <span className="post-name">{post.name}</span>
                        </Link>
                        <span className="post-date">{moment(post.createdAt).fromNow()}</span>
                    </div>
                </div>
                <MoreHorizIcon />
            </div>  
            <div className="post-content">
                <p>{post.desc}</p>      
                <img src={"./upload/" + post.img} alt="" /> {/*da bi prikazali slike iz foldera upload*/}
            </div>
            <div className="post-info">
                <div className="post-item">
                    {data.includes(currentUser.id) ? (<FavoriteIcon className="icon-color-blue" onClick={handleLike}/>) : (<FavoriteBorderIcon onClick={handleLike}/>)}
                    {data.length} lajkova
                </div>
                <div className="post-item" onClick={()=>setCommentOpen(!commentOpen)}> {/*ako je otvoren, zatvori, inace otvori*/}
                    <AddCommentIcon />
                    9<span>komentara</span>
                </div>
                <div className="post-item">
                    <ShareIcon />
                    <span>Podijeli</span>
                </div>
            </div>
            {commentOpen && <Comments postId={post.id} />} {/*da li će se prikazati*/}
        </div>
    </div>
  )
}

export default Post;