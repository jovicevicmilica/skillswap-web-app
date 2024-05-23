import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './AdminPage.css';
import { makeAdminRequest } from '../../axiosAdm';

const AdminPage = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [mostUsersTown, setMostUsersTown] = useState('');

    useEffect(() => {
        fetchTotalUsers().then(data => setTotalUsers(data.totalUsers)).catch(err => console.error(err));
        fetchTotalPosts().then(data => setTotalPosts(data.totalPosts)).catch(err => console.error(err));
        fetchMostUsersTown().then(data => setMostUsersTown(data.town)).catch(err => console.error(err));
    }, []);

    const fetchTotalUsers = async () => {
        const response = await makeAdminRequest('/total-users');
        return response.data;
    };

    const fetchTotalPosts = async () => {
        const response = await makeAdminRequest('/total-posts');
        return response.data;
    };

    const fetchMostUsersTown = async () => {
        const response = await makeAdminRequest('/most-users-town');
        return response.data;
    };

    const handleViewRequests = () => {
        window.open('https://mail.google.com/mail/', '_blank');
    };

    return (
        <div className="admin-page">
            <div className="admin-header">Admin dashboard</div>
            <div className="admin-content-main">
                <div className="statistic">
                    <label>Ukupan broj korisnika</label>
                    <div>{totalUsers}</div>
                </div>
                <div className="statistic">
                    <label>Ukupan broj objava</label>
                    <div>{totalPosts}</div>
                </div>
                <div className="statistic">
                    <label>Najviše korisnika iz grada</label>
                    <div>{mostUsersTown || 'Učitavam...'}</div>
                </div>
                <button className="view-requests-btn" onClick={handleViewRequests}>
                    Pregledaj zahtjeve
                </button>
            </div>
        </div>
    );
};

export default AdminPage;
