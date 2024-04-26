import { React, useState } from 'react';
import './Post.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from 'react-router-dom';
import Comments from '../Comments/Comments';

const Post = ({post}) => {
  const [commentOpen, setCommentOpen] = useState(false);
  //privremena animacija za srca prije back end - a
  const liked = true;

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
                        <span className="post-date">4 minutes ago</span>
                    </div>
                </div>
                <MoreHorizIcon />
            </div>  
            <div className="post-content">
                <p>{post.desc}</p>      
                <img src={post.img} alt="" />
            </div>
            <div className="post-info">
                <div className="post-item">
                    {liked ? <FavoriteIcon className="icon-color-blue" /> : <FavoriteBorderIcon />}
                    27 lajkova
                </div>
                <div className="post-item" onClick={()=>setCommentOpen(!commentOpen)}> {/*ako je otvoren, zatvori, inace otvori*/}
                    <AddCommentIcon />
                    9 komentara
                </div>
                <div className="post-item">
                    <ShareIcon />
                    Podijeli
                </div>
            </div>
            {commentOpen && <Comments />} {/*da li će se prikazati*/}
        </div>
    </div>
  )
}

export default Post;