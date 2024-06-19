import React, { useContext, useState } from 'react';
import './Comments.css';
import { AuthContext } from "../../context/authContext";
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from "moment";
import "moment/locale/bs"; /*naš jezik*/
import { toast } from 'react-toastify'; // for alert messages
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Comments = ({postId}) => { /*komentare gledamo u odnosu na post, pa koristimo postId*/
  //KOMENTARI
  const [desc, setDesc] = useState("");

  const {currentUser} = useContext(AuthContext); //da bi mogli dobiti profilnu sliku za komentar

  const queryClient = useQueryClient();
  moment.locale("bs"); //da se proteklo vrijeme prikazuje na ijekavici

  /*sada pravimo mutaciju*/
  const mutation = useMutation({
    mutationFn: (newComment) => {
        return makeRequest.post("/comments", newComment); //objavimo komentar
    },
    onSuccess: () => {
      /*refreshujemo da bi mogli objaviti opet*/
      queryClient.invalidateQueries(['comments']);
    }
  });
  
  const { isLoading, error, data } = useQuery({
    queryKey: ['home-page/comments'],
    queryFn: () => makeRequest.get("/comments?postId=" + postId).then(res => res.data) //dobijemo sve komentare za određenu objavu
  });

  if (isLoading) {
    return <div>Učitavam...</div>;
  }

  if (error) {
    toast.error(`Desila se greška: ${error.message}`);
    return <div>Greška: {error.message}</div>;
  }

  const handleClick = async (e) => {
    e.preventDefault();

    /*sada počinjemo koristiti react query mutacije*/
    mutation.mutate({ desc, postId });  //objavimo komentar

    /*refresh*/
    setDesc("");
  };

  return (
    <div className="comments">
        <div className="comments-write">
            <img src={"/upload/" + currentUser.profilePic} alt="" />
            <input type="text" placeholder="Napišite komentar..." value={desc} onChange={e => setDesc(e.target.value)}/>
            <button onClick={handleClick}>Objavi</button>
        </div>
        {data && data.length > 0 ? (data.map(comment=>(
            <div className="comment">
                <img src={"/upload/" + comment.profilePic} alt="" />
                <div className="comment-info">
                    <Link to={`/home-page/profile/${comment.userId}`} style={{textDecoration:"none", color:"inherit"}}> 
                      <span>{comment.name}</span>
                    </Link>
                    <p>{comment.desc}</p>
                </div>
                <span className="comment-date">{moment(comment.createdAt).fromNow()}</span>
            </div>
        ))) : (<p>Nema komentara. Budite prvi koji će nešto napisati!</p>)}
    </div>
  )
}

export default Comments;