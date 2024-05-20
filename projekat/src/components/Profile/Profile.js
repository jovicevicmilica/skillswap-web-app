import React, { useContext, useState } from 'react';
import './Profile.css';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import InfoIcon from '@mui/icons-material/Info';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from '../Posts/Posts';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HelpIcon from '@mui/icons-material/Help';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { toast } from 'react-toastify'; 
import { useLocation } from 'react-router';
import { AuthContext } from '../../context/authContext';
import Update from '../Update/Update';

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const userId = parseInt(useLocation().pathname.split("/")[3]); 
  const { currentUser } = useContext(AuthContext); 

  const [showSkills, setShowSkills] = useState(false);

  const toggleSkills = () => {
    setShowSkills(!showSkills);
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['home-page/user', userId],
    queryFn: () => makeRequest.get(`/users/find/${userId}`).then(res => res.data)
  });

  const { isLoading: isRelationshipLoading, error: relationshipError, data: relationshipData } = useQuery({
    queryKey: ['home-page/relationship', userId],
    queryFn: () => makeRequest.get(`/relationships?followedUserId=${userId}`).then(res => res.data) // Updated URL
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (following) => {
      if(following) return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['home-page/relationship', userId]);
    }
  });

  if (isLoading) {
    toast.info("Podaci se učitavaju...");
    return <div>Učitavam...</div>;
  }

  if (error) {
    toast.error(`Desila se greška: ${error.message}`);
    return <div>Greška: {error.message}</div>;
  }

  if (isRelationshipLoading) {
    toast.info("Podaci o odnosima se učitavaju...");
    return <div>Učitavam odnose...</div>;
  }

  if (relationshipError) {
    toast.error(`Greška pri učitavanju odnosa: ${relationshipError.message}`);
    return <div>Greška: {relationshipError.message}</div>;
  }

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };

  const ownedSkills = data.skills.filter(skill => skill.type === 'imam').map(skill => ({
    ...skill
  }));
  const desiredSkills = data.skills.filter(skill => skill.type === 'želim').map(skill => ({
    ...skill
  }));

  return (
    <div className="profile">
      <div className="profile-images">
        <img src={"/upload/" + data.coverPic} alt="" className="cover-photo" />
        <img src={"/upload/" + data.profilePic} alt="" className="profile-photo" />
      </div>
      <div className="profile-container">
        {showSkills ? (
          <div className="profile-bio-info">
            <div className="bio-header">
              <div className="back-arrow" onClick={toggleSkills}>
                <ArrowBackIcon />
              </div>
            </div>
            <div className="bio-content">
              <div className="column-left">
                <h3>Vještine koje posjedujem:</h3>
                <div className="bio-list">
                  {ownedSkills.map((skill, index) => (
                    <div key={index} className="bio-skill">
                      <Brightness1Icon className={`bio-icon ${skill.skillLevel}`} /> {skill.skill}
                    </div>
                  ))}
                </div>
              </div>
              <div className="column-right">
                <h3>Vještine koje tražim:</h3>
                <div className="bio-list">
                  {desiredSkills.map((skill, index) => (
                    <div key={index} className="bio-skill">
                      <Brightness1Icon className={`bio-icon ${skill.skillLevel}`} /> {skill.skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="profile-user-info">
            <div className="profile-left">
              <HelpIcon className="icon-color-blue" fontSize='large' />
            </div>
            <div className="profile-center">
              <span className="profile-name">{data.name}</span>
              <div className="profile-info">
                <div className="profile-item">
                  <PlaceIcon className="icon-color-blue" />
                  <span>{data.town}</span>
                </div>
                <div className="profile-item">
                  <StarIcon className="icon-color-blue" />
                  <span>{data.learningPref}</span>
                </div>
              </div>
              {userId === currentUser.id ? (
                <button className="profile-button" onClick={() => setOpenUpdate(true)}>Ažuriraj profil</button>
              ) : (
                relationshipData && relationshipData.includes(currentUser.id) ? (
                  <button className="profile-button" onClick={handleFollow}>Razmjena zatražena</button>
                ) : (
                  <button className="profile-button" onClick={handleFollow}>Zatraži razmjenu</button>
                )
              )}
            </div>
            <div className="profile-right">
              <InfoIcon onClick={toggleSkills} />
              <MoreVertIcon />
            </div>
          </div>
        )}
        <Posts userId={userId} />
      </div>
      {openUpdate && (
        <Update setOpenUpdate={setOpenUpdate}
          user={data} 
        />
      )}
    </div>
  );
};

export default Profile;
