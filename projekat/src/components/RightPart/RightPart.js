import React from 'react';
import './RightPart.css';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { Link } from 'react-router-dom';

const RightPart = () => {
  //ZAHTJEVI ZA PRAĆENJE
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['followers'],
    queryFn: () => makeRequest.get('/follows/followers').then(res => res.data), //pridobijemo zahtjeve
  });

  const acceptMutation = useMutation({
    mutationFn: (userId) => makeRequest.post('/follows/followers/accept', { userId }), //prihvatimo zahtjev
    onSuccess: () => {
      queryClient.invalidateQueries(['followers']);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (userId) => makeRequest.delete('/follows/followers/reject', { data: { userId } }), //odbijemo zahtjev
    onSuccess: () => {
      queryClient.invalidateQueries(['followers']);
    },
  });

  const handleAccept = (userId) => { //ukoliko je prihvaćeno, mutiramo tu mutaciju
    acceptMutation.mutate(userId);
  };

  const handleReject = (userId) => { //inače odbijamo
    rejectMutation.mutate(userId);
  };

  if (isLoading) return <div>Učitavam...</div>;
  if (error) return <div>Greška: {error.message}</div>;

  return (
    <div className="right-part">
      <div className="rp-container">
        <div className="rp-item">
          <span>Zahtjevi za razmjenu</span>
          {data.length === 0 ? (
            <div className="no-requests">Nema novih zahtjeva.</div>
          ) : (
            data.map(user => (
              <div className="rp-user" key={user.id}>
                <div className="rp-user-info">
                  <img src={"/upload/" + user.profilePic} alt={user.name} />
                  <Link to={`/home-page/profile/${user.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <span>{user.name}</span>
                  </Link>
                </div>
                <div className="rp-buttons">
                  <button className="rp-button" onClick={() => handleAccept(user.id)}>
                    <CheckCircleIcon className="icon-color-blue" />
                  </button>
                  <button className="rp-button" onClick={() => handleReject(user.id)}>
                    <CancelIcon />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RightPart;