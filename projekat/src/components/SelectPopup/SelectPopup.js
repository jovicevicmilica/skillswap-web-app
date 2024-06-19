import React, { useEffect, useState } from 'react';
import './SelectPopup.css';
import Select from 'react-select';
import CloseIcon from '@mui/icons-material/Close';
import { makeRequest } from '../../axios';

const townOptions = [
  { label: "Podgorica", value: "Podgorica" },
  { label: "Nikšić", value: "Nikšić" },
  { label: "Herceg Novi", value: "Herceg Novi" },
  { label: "Pljevlja", value: "Pljevlja" },
  { label: "Bijelo Polje", value: "Bijelo Polje" },
  { label: "Bar", value: "Bar" },
  { label: "Cetinje", value: "Cetinje" },
  { label: "Ulcinj", value: "Ulcinj" },
  { label: "Kotor", value: "Kotor" },
  { label: "Budva", value: "Budva" },
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: '1px solid rgba(0, 0, 0, 0.1)',
    color: '#000',
    backgroundColor: 'rgba(0, 69, 246, .1)',
    padding: '5px 5px 5px',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '1.42857',
    borderRadius: 0,
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: 0,
  }),
};

const SelectPopup = ({ type, closePopup, addTag }) => {
  //POPUP KOJI NAM OMOGUĆAVA DA TAGUJEMO PRIJATELJA ILI MJESTO
  const [friends, setFriends] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await makeRequest.get('/friends/showFriends'); //da pridobijemo prijatelje korisnika, da od njih bira koga taguje
        const friendOptions = res.data.map(friend => ({
          label: friend.name,
          value: friend.id,
          link: `/home-page/profile/${friend.id}` //link nam vodi na njihov profil
        }));
        setFriends(friendOptions);
      } catch (err) {
        console.log(err);
      }
    };

    if (type === 'friend') { //provjera tipa popup - a
      fetchFriends();
    }
  }, [type]);

  const options = type === 'friend' ? friends : townOptions; //ako nam je popup za mjesto, onda se bira od opcija gradova

  const handleSelect = (option) => {
    setSelectedOption(option);
    addTag(option); //odaberemo neku od opcija
    closePopup();
  };

  return (
    <div className="select-popup-overlay" onClick={closePopup}>
      <div className="select-popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="select-popup-close-button" onClick={closePopup}>
          <CloseIcon />
        </button>
        <Select
          options={options}
          onChange={handleSelect}
          placeholder={type === 'friend' ? 'Izaberi prijatelja...' : 'Izaberi mjesto...'}
          styles={customStyles}
          className="select-popup-select"
        />
      </div>
    </div>
  );
};

export default SelectPopup;
