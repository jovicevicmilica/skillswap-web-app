import React, { useContext } from 'react';
import './Comments.css';
import { AuthContext } from "../../context/authContext";

const Comments = () => {
  const {currentUser} = useContext(AuthContext);
  const comments = [
    {
        id: 2,
        desc: "Lijepa slika.",   
        name: "Nikolina Todorović",
        userId: 1,
        profilePicture: "https://www.shutterstock.com/image-photo/young-beautiful-brunette-woman-wearing-600nw-1667900191.jpg",
    },

    {
        id: 2,
        desc: "Hvala.",   
        name: "Milica Jovićević",
        userId: 2,
        profilePicture: "https://www.shutterstock.com/image-photo/smiling-businesswoman-looking-camera-webcam-600nw-1302585136.jpg",
    },
  ];

  return (
    <div className="comments">
        <div className="comments-write">
            <img src={currentUser.profilePicture} alt="" />
            <input type="text" placeholder="Napišite komentar..." />
            <button>Objavi</button>
        </div>
        {comments.map(comment=>(
            <div className="comment">
                <img src={comment.profilePicture} alt="" />
                <div className="comment-info">
                    <span>{comment.name}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className="comment-date">1 sat ranije</span>
            </div>
        ))}
    </div>
  )
}

export default Comments;