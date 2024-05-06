import React, { useContext, useState } from 'react';
import './Comments.css';
import { AuthContext } from "../../context/authContext";
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import moment from "moment";
import "moment/locale/bs"; /*naš jezik*/
import { toast } from 'react-toastify'; // for alert messages
import { useMutation, useQueryClient } from '@tanstack/react-query';

const Comments = ({postId}) => { /*komentare gledamo u odnosu na post, pa koristimo postId*/
  const [desc, setDesc] = useState("");

  const {currentUser} = useContext(AuthContext);

  const queryClient = useQueryClient();
  moment.locale("bs");

  /*sada pravimo mutaciju*/
  const mutation = useMutation({
    mutationFn: (newComment) => {
        return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      /*refreshujemo da bi mogli objaviti opet*/
      queryClient.invalidateQueries(['comments']);
    }
  });
  
  const { isLoading, error, data } = useQuery({
    queryKey: ['home-page/comments'],
    queryFn: () => makeRequest.get("/comments?postId=" + postId).then(res => res.data)
  });

  if (isLoading) {
    toast.info("Komentari se učitavaju!");
    return <div>Učitavam...</div>;
  }

  if (error) {
    toast.error(`Desila se greška: ${error.message}`);
    return <div>Greška: {error.message}</div>;
  }

  const handleClick = async (e) => {
    e.preventDefault();

    /*sada počinjemo koristiti react query mutacije*/
    mutation.mutate({ desc, postId }); 

    /*refresh*/
    setDesc("");
  };

  return (
    <div className="comments">
        <div className="comments-write">
            <img src={currentUser.profilePic} alt="" />
            <input type="text" placeholder="Napišite komentar..." value={desc} onChange={e => setDesc(e.target.value)}/>
            <button onClick={handleClick}>Objavi</button>
        </div>
        {data && data.length > 0 ? (data.map(comment=>(
            <div className="comment">
                <img src={comment.profilePic} alt="" />
                <div className="comment-info">
                    <span>{comment.name}</span>
                    <p>{comment.desc}</p>
                </div>
                <span className="comment-date">{moment(comment.createdAt).fromNow()}</span>
            </div>
        ))) : (<p>Nema komentara. Budite prvi koji će nešto napisati!</p>)}
    </div>
  )
}

export default Comments;