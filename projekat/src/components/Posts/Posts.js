import React from 'react';
import './Posts.css';
import Post from '../Post/Post';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { toast } from 'react-toastify'; // for alert messages

const Posts = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => makeRequest.get("/home-page/posts").then(res => res.data)
  });

  if (isLoading) {
    toast.info("Objave se učitavaju!");
    return <div>Učitavam...</div>;
  }

  if (error) {
    toast.error(`Desila se greška: ${error.message}`);
    return <div>Greška: {error.message}</div>;
  }

  return (
    <div className="posts">
      {data && data.length > 0 ? (
        data.map(post => <Post key={post.id} post={post} />)
      ) : (
        <p>Nema dostupnih objava. Povežite se sa nekim već sada!</p>
      )}
    </div>
  );
}

export default Posts;