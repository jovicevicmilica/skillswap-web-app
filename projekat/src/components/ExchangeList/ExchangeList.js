import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../axios';

const fetchExchangeUsers = () => {
  return makeRequest.get('/friends/showExchangeUsers').then(res => res.data);
};

const ExchangeList = () => {
  //LISTA PREDLOŽENIH ZA PRAĆENJE NA OSNOVU VJEŠTINA KOJE IMA
  const navigate = useNavigate();

  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['fetchExchangeUsers'], //pozivamo prikaz ljudi koji imaju vještine koje tražimo
    queryFn: fetchExchangeUsers
  });

  if (isLoading) return <div>Učitavam...</div>;
  if (isError) return <div>Greška prilikom učitavanja.</div>;

  return (
    <div className="friends-list">
      <h1>Korisnici koji imaju vještine koje tražite</h1>
      <div className="friend-header">
        <span></span> {/*prva kolona za sliku je prazna u headeru*/}
        <span>Ime i prezime</span>
        <span>Grad</span>
        <span>Vještine</span>
      </div>
      {users.length === 0 ? (
        <div className="no-friends">Nema korisnika sa traženim vještinama.</div>
      ) : (
        users.map(user => (
        <div key={user.id} className="friend-item" onClick={() => navigate(`/home-page/profile/${user.id}`)}>
          <img src={"/upload/" + user.profilePic} alt={user.name} />
          <span>{user.name}</span>
          <span>{user.town}</span>
          <span>
            {user.skills && user.skills.length > 1 
              ? user.skills.filter(skill => skill).join(', ') 
              : (user.skills && user.skills[0] ? user.skills[0] : '')
            }
          </span> {/*prikazuje sve vještine koje korisnik ima, a koje su nama potrebne, uklanja null vrijednosti, spaja ih zarezom*/}
        </div>
        ))
      )}
    </div>
  );
};

export default ExchangeList;
