import React, { useContext } from 'react';
import './Messages.css';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext'; 

const fetchMessages = () => {
  return makeRequest.get('/messages/showMessages').then(res => res.data); //najnovije poruke na vrh, ništa ne treba reverse - ovati
};

const Messages = () => {
  //DA PRIDOBIJEMO PORUKE KORISNIKA
  const { currentUser } = useContext(AuthContext); //uzmemo trenutnog korisnika
  const { data: messages, isLoading, isError, refetch } = useQuery({
    queryKey: ['fetchMessages'],
    queryFn: fetchMessages //pozivamo da se pridobiju poruke
  });

  if (isLoading) return <div>Učitavam...</div>;
  if (isError) return <div>Greška prilikom učitavanja.</div>;

  return (
    <div className="messages-list">
      <h1>Poruke</h1>
      <div className="message-header">
        <span>Korisnik</span>
        <span>Poruka</span>
      </div>
      {messages.length === 0 ? (
        <div className="no-messages">Nema novih poruka.</div>
      ) : (
        messages.map((msg, index) => (
          <div key={index} className="message-item">
            <span>{msg.name}</span>
            {/*prikažemo poruku i omogućimo da se klikom pošalje mail za zahtjev za komunikaciju*/}
            <p>Uspješno ste se povezali sa korisnikom. Ako želite sklopiti dogovor oko razmjene vještina, možete ga/je kontaktirati na
              <a href={`mailto:${msg.email}?subject=Zahtjev za razmjenu vještina&body=Pozdrav ${msg.name},%0D%0AŽelim razgovarati o mogućoj razmjeni vještina.%0D%0APozdrav,%0D%0A${currentUser.name}`} className="message-email"> {msg.email}</a>.
            </p>
          </div>
        ))
      )}
      <button onClick={refetch} className="messages-button">Osvježi poruke</button> /*da refreshujemo poruke*/
    </div>
  );
};

export default Messages;
