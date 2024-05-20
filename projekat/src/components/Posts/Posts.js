import React, { useEffect } from 'react';
import './Posts.css';
import Post from '../Post/Post';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { toast } from 'react-toastify';

const Posts = ({userId}) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['home-page/posts'],
    queryFn: () => makeRequest.get("/posts?userId=" + userId).then(res => res.data)
  });

  if (isLoading) {
    return <div>Učitavam...</div>;
  }

  if (error) {
    return <div>Greška: {error.message}</div>;
  }

  return (
    <div className="posts">
      {data && data.length > 0 ? (
        data.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>Nema dostupnih objava. Povežite se sa nekim već sada!</p>
      )}
    </div>
  );
};

export default Posts;
