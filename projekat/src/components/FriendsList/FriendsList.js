import React from 'react';
import './FriendsList.css';
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../axios';

const fetchFriends = () => {
  return makeRequest.get('/friends/showFriends').then(res => res.data);
};

const FriendsList = () => {
  const navigate = useNavigate();

  const { data: friends, isLoading, isError } = useQuery({
    queryKey: ['fetchFriends'],
    queryFn: fetchFriends
  });

  if (isLoading) return <div>Učitavam...</div>;
  if (isError) return <div>Greška prilikom učitavanja.</div>;

  return (
    <div className="friends-list">
      <h1>Vaši prijatelji</h1>
      <div className="friend-header">
        <span></span> {/*prva kolona za sliku je prazna u headeru*/}
        <span>Ime i prezime</span>
        <span>E-mail</span>
        <span>Primarna vještina</span>
      </div>
      {friends.map(friend => (
        <div key={friend.id} className="friend-item" onClick={() => navigate(`/home-page/profile/${friend.id}`)}>
          <img src={"/upload/" + friend.profilePic} alt={friend.name} />
          <span>{friend.name}</span>
          <span>{friend.email}</span>
          <span>{friend.primarySkill}</span>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
