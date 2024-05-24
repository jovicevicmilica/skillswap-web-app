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
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isAddUserPopupOpen, setIsAddUserPopupOpen] = useState(false); 
    const [isUpdateUserPopupOpen, setIsUpdateUserPopupOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []); //ovaj prazan array osigurava da se useEffect pokrene samo jednom nakon učitavanja komponente.

    const fetchUsers = async () => {
        try {
            const response = await makeAdminRequest.get('/users'); 
            setUsers(response.data); 
            setFilteredUsers(response.data);
        } catch (error) {
            console.error('Neuspješno dohvaćeni korisnici:', error);
        }
    };

    const handleUpdate = (userId) => {
        const user = users.find(user => user.id === userId);
        setSelectedUser(user);
        setIsUpdateUserPopupOpen(true);
    };

    const handleDelete = async (userId) => {
        try {
            await makeAdminRequest.delete(`/users/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
            setFilteredUsers(filteredUsers.filter(user => user.id !== userId));
            toast.success("Korisnik je uspješno obrisan.");
        } catch (error) {
            console.error('Neuspješno obrisan korisnik:', error);
            toast.error("Greška prilikom brisanja korisnika.");
        }
    };

    const handleAddUser = (newUser) => {
        setUsers(prevUsers => [...prevUsers, newUser]);
        setFilteredUsers(prevUsers => [...prevUsers, newUser]); //ažuriramo i filtriranu listu
    };

    const handleUpdateUser = (updatedUser) => {
        setUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
        setFilteredUsers(prevUsers => prevUsers.map(user => user.id === updatedUser.id ? updatedUser : user));
    };

    const handleSearch = async (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.trim() === '') {
            setFilteredUsers(users);
            return;
        }

        try {
            const response = await makeAdminRequest.get(`/search-users?query=${query}`);
            setFilteredUsers(response.data);
        } catch (error) {
            console.error('Greška u pretrazi korisnika:', error);
            setFilteredUsers([]);
        }
    };

    const getSkillLevelColor = (level) => {
        switch(level) {
            case 'loš':
                return 'red';
            case 'srednji':
                return 'yellow';
            case 'odličan':
                return 'green';
            default:
                return 'gray';
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
                        value={searchQuery}
                        onChange={handleSearch}
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
                    {filteredUsers.map((user) => (
                        <div className="table-row" key={user.id}>
                            <div className="table-cell user-info">
                                <img src={"/upload/" + user.profilePic} alt="Profile" className="profile-pic" />
                                {user.name}
                            </div>
                            <div className="table-cell">{user.email}</div>
                            <div className="table-cell">{user.town}</div>
                            <div className="table-cell">
                                <span className="skill-container">
                                    <span className="skill-dot" style={{ backgroundColor: getSkillLevelColor(user.primarySkillLevel) }}></span>
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
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default AdminUsers;
