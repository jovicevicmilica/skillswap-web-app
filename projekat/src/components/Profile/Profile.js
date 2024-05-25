import React, { useContext, useState, useMemo, useEffect } from 'react';
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
import { useNavigate } from 'react-router';

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const userId = parseInt(useLocation().pathname.split("/")[3]); 
  const { currentUser } = useContext(AuthContext); 

  const [showSkills, setShowSkills] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const toggleMoreOptions = () => {
      setShowMoreOptions(!showMoreOptions);
  };

  const toggleSkills = () => {
    setShowSkills(!showSkills);
  };

  const navigate = useNavigate();

  const reportUser = () => { //šaljemo mejl adminu
    const mailto = `mailto:skillswap24@gmail.com?subject=Prijava korisnika ${data.name}&body=Poštovani,%0D%0A%0D%0AObraćam vam se kako bih skrenuo pažnju na ponašanje korisnika ${data.name}.%0D%0A%0D%0A[Ovdje napišite detalje prijave.]%0D%0A%0D%0AS poštovanjem,%0D%0A${currentUser.name}`;
    window.location.href = mailto;
  };

  const deleteUser = () => { //ukoliko je naš profil, umjesto prijave možemo da obrišemo profil
    makeRequest.delete(`/users/delete/${currentUser.id}`)
      .then(response => {
        toast.success('Profil je uspješno obrisan.');
        navigate("/");
      })
      .catch(error => {
        toast.error(`Došlo je do greške: ${error.response.data}`);
      });
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['home-page/user', userId],
    queryFn: () => makeRequest.get(`/users/find/${userId}`).then(res => res.data)
  });

  const { isLoading: isRelationshipLoading, error: relationshipError, data: relationshipData } = useQuery({
    queryKey: ['home-page/relationship', userId],
    queryFn: () => makeRequest.get(`/relationships?followedUserId=${userId}`).then(res => res.data)
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

  const ownedSkills = useMemo(() => {
    if (!data) return [];
    const primarySkill = {
      skill: data.primarySkill,
      skillLevel: data.primarySkillLevel,
      type: 'imam'  
    };
  
    const additionalSkills = data.skills.filter(skill => skill.type === 'imam');
    return [primarySkill, ...additionalSkills];
  }, [data]);

  const desiredSkills = useMemo(() => data?.skills.filter(skill => skill.type === 'želim') || [], [data]);

  useEffect(() => { //da lakše zatvorimo opciju obriši/prijavi klikom bilo gdje pored
    const closeMenu = (e) => {
        if (!e.target.closest('.profile-right')) {
            setShowMoreOptions(false);
        }
    };

    if (showMoreOptions) {
        document.addEventListener('click', closeMenu);
    }

    return () => {
        document.removeEventListener('click', closeMenu);
    };
  }, [showMoreOptions]);

  if (isLoading) {
    return <div>Učitavam...</div>;
  }

  if (error) {
    toast.error(`Desila se greška: ${error.message}`);
    return <div>Greška: {error.message}</div>;
  }

  if (isRelationshipLoading) {
    return <div>Učitavam odnose...</div>;
  }

  if (relationshipError) {
    toast.error(`Greška pri učitavanju odnosa: ${relationshipError.message}`);
    return <div>Greška: {relationshipError.message}</div>;
  }

  const handleFollow = () => {
    const isFollowing = relationshipData.isFollowing;
    mutation.mutate(isFollowing);
  };

  const getRelationshipStatus = (relationshipData, currentUser, userId) => {
    const isFollowing = relationshipData.isFollowing;
    const isFollowedBy = relationshipData.followers.some(rel => rel.followerUserId === currentUser.id && rel.isMutual);

    if (isFollowing && isFollowedBy) {
      return 'Povezani';
    } else if (isFollowing) {
      return 'Razmjena zatražena';
    } else {
      return 'Zatraži razmjenu';
    }
  };

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
              <span></span> {/*ovdje ipak neće biti ništa*/}
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
                <button className="profile-button" onClick={handleFollow}>
                  {getRelationshipStatus(relationshipData, currentUser, userId)}
                </button>
              )}
            </div>
            <div className="profile-right">
              <InfoIcon onClick={toggleSkills} />
              <MoreVertIcon onClick={toggleMoreOptions} />
              {showMoreOptions && (
                  <div className="more-options-menu">
                      {userId === currentUser.id ? (
                          <button onClick={deleteUser}>Obriši profil</button>
                      ) : (
                          <button onClick={reportUser}>Prijavi profil</button>
                      )}
                  </div>
              )}
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
