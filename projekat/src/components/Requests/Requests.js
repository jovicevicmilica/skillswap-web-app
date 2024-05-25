import React from 'react';
import './Requests.css';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

const fetchRequests = () => {
  return makeRequest.get('/follows/followers').then(res => res.data);
};

const Requests = () => {
  const queryClient = useQueryClient();

  const { data: requests, isLoading, isError } = useQuery({
    queryKey: ['fetchRequests'],
    queryFn: fetchRequests
  });

  const acceptMutation = useMutation({
    mutationFn: (userId) => makeRequest.post('/follows/followers/accept', { userId }),
    onSuccess: () => {
      queryClient.invalidateQueries(['fetchRequests']);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (userId) => makeRequest.delete('/follows/followers/reject', { data: { userId } }),
    onSuccess: () => {
      queryClient.invalidateQueries(['fetchRequests']);
    },
  });

  const handleAccept = (userId) => {
    acceptMutation.mutate(userId);
  };

  const handleReject = (userId) => {
    rejectMutation.mutate(userId);
  };

  if (isLoading) return <div>Učitavam...</div>;
  if (isError) return <div>Greška prilikom učitavanja.</div>;

  return (
    <div className="requests-list">
      <h1>Zahtjevi za razmjenu</h1>
      <div className="request-header">
        <span></span>
        <span>Ime i prezime</span>
      </div>
      {requests.length === 0 ? (
        <div className="no-requests main">Nema novih zahtjeva.</div>
      ) : (
        requests.map((user) => (
          <div key={user.id} className="request-item">
            <span>{user.name}</span>
            <div className="request-actions">
              <button onClick={() => handleAccept(user.id)} className="accept-button">
                <CheckCircleIcon className="icon-color-blue" />
              </button>
              <button onClick={() => handleReject(user.id)} className="reject-button">
                <CancelIcon />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Requests;
