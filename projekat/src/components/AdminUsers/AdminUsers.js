import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminUsers.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddUserPopup from '../AddUserPopup/AddUserPopup';
import UpdateUserPopup from '../UpdateUserPopup/UpdateUserPopup';
import { makeAdminRequest } from '../../axiosAdm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';

const AdminUsers = () => {
    //PRIKAZ KORISNIKA NA STRANI ADMINA
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]); //filterovani korisnici
    const [isAddUserPopupOpen, setIsAddUserPopupOpen] = useState(false); //popup za dodavanje korisnika na strani admina
    const [isUpdateUserPopupOpen, setIsUpdateUserPopupOpen] = useState(false); //popup za ažuriranje korisnika
    const [selectedUser, setSelectedUser] = useState(null); //da se zna kojeg korisnika mijenjamo
    const [searchQuery, setSearchQuery] = useState(''); //search

    useEffect(() => {
        fetchUsers(); //dobijemo korisnike
    }, []); //ovaj prazan array osigurava da se useEffect pokrene samo jednom nakon učitavanja komponente

    const fetchUsers = async () => {
        try {
            const response = await makeAdminRequest.get('/users'); 
            setUsers(response.data); //postavimo korisnike i filterovane korisnike, pošto još nema pretrage
            setFilteredUsers(response.data);
        } catch (error) {
            console.error('Neuspješno dohvaćeni korisnici:', error);
        }
    };

    const handleUpdate = (userId) => {
        const user = users.find(user => user.id === userId);
        setSelectedUser(user); //postavimo selektovanog korisnika, da ga promijenimo
        setIsUpdateUserPopupOpen(true); //otvorimo Update popup
    };

    const handleDelete = async (userId) => {
        try {
            await makeAdminRequest.delete(`/users/${userId}`); //brišemo korisnika
            setUsers(users.filter(user => user.id !== userId)); //mičemo ga iz skupa korisnika
            setFilteredUsers(filteredUsers.filter(user => user.id !== userId)); //i skupa filterovanih korisnika
            toast.success("Korisnik je uspješno obrisan.");
        } catch (error) {
            console.error('Neuspješno obrisan korisnik:', error);
            toast.error("Greška prilikom brisanja korisnika.");
        }
    };

    const handleAddUser = (newUser) => {
        setUsers(prevUsers => [...prevUsers, newUser]); //prethodni ostaju isti, dodaje se novi
        setFilteredUsers(prevUsers => [...prevUsers, newUser]); //ažuriramo i filtriranu listu
    };

    const handleUpdateUser = (updatedUser) => {
        setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
        //na mjestu starog, postavimo novi
        setFilteredUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
    };

    //pretraga korisnika po imenu
    const handleSearch = async (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query); //postavimo search

        if (query.trim() === '') {
            setFilteredUsers(users); //promijenimo filterovane korisnike, ako ništa nije unijeto, na sve
            return;
        }

        try {
            const response = await makeAdminRequest.get(`/search-users?query=${query}`); //na osnovu query - ja pretražujemo
            setFilteredUsers(response.data); //novi filterovani korisnici poslije pretrage
        } catch (error) {
            console.error('Greška u pretrazi korisnika:', error);
            setFilteredUsers([]); //refreshujemo
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-header">Upravljanje korisnicima</div>
            <div className="admin-content">
                <button className="add-user-btn" onClick={() => setIsAddUserPopupOpen(true)}>Dodaj korisnika</button>
                <div className="admin-search-users">
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Pretraži korisnike..."
                        value={searchQuery} //value nam je ono što unesemo
                        onChange={handleSearch} //pozivamo pretragu
                        className="admin-search-input"
                    />
                </div>
                <div className="admin-users-table">
                    <div className="table-header">
                        <div className="table-cell">Ime i prezime</div>
                        <div className="table-cell">Email</div>
                        <div className="table-cell">Grad</div>
                        <div className="table-cell">Primarna vještina</div>
                        <div className="table-cell">Preference učenja</div>
                        <div className="table-cell">Akcije</div>
                    </div>
                    {filteredUsers.map((user) => ( //prolazimo kroz sve filterovane korisnike i redom ih prikazujemo
                        <div className="table-row" key={user.id}>
                            <div className="table-cell user-info">
                                <img src={"/upload/" + user.profilePic} alt="Profile" className="profile-pic" />
                                {user.name}
                            </div>
                            <div className="table-cell">{user.email}</div>
                            <div className="table-cell">{user.town}</div>
                            <div className="table-cell">
                                <span className="skill-container">
                                    {user.primarySkill}
                                </span>
                            </div>
                            <div className="table-cell">{user.learningPref}</div>
                            <div className="table-cell actions">
                                <EditIcon onClick={() => handleUpdate(user.id)} className="action-icon" />
                                <DeleteIcon onClick={() => handleDelete(user.id)} className="action-icon black" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isAddUserPopupOpen && <AddUserPopup setIsAddUserPopupOpen={setIsAddUserPopupOpen} onAddUser={handleAddUser} />}
            {isUpdateUserPopupOpen && <UpdateUserPopup setIsUpdateUserPopupOpen={setIsUpdateUserPopupOpen} user={selectedUser} onUserUpdated={handleUpdateUser} />}
            {/*pop - upovi za add i update*/}
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default AdminUsers;
