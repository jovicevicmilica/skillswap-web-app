import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPosts.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Visibility';
import AddPostPopup from '../AddPostPopup/AddPostPopup';
import UpdatePostPopup from '../UpdatePostPopup/UpdatePostPopup';
import PreviewPostPopup from '../PreviewPostPopup/PreviewPostPopup';
import { makeAdminRequest } from '../../axiosAdm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from '@mui/icons-material/Search';

const AdminPosts = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isAddPostPopupOpen, setIsAddPostPopupOpen] = useState(false);
    const [isUpdatePostPopupOpen, setIsUpdatePostPopupOpen] = useState(false);
    const [isPreviewPostPopupOpen, setIsPreviewPostPopupOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await makeAdminRequest.get('/posts'); 
            setPosts(response.data); 
            setFilteredPosts(response.data);
        } catch (error) {
            console.error('Neuspješno dohvaćeni postovi:', error);
        }
    };

    const handleUpdate = (postId) => {
        const post = posts.find(post => post.id === postId);
        setSelectedPost(post);
        setIsUpdatePostPopupOpen(true);
    };

    const handleDelete = async (postId) => {
        try {
            await makeAdminRequest.delete(`/posts/${postId}`);
            setPosts(posts.filter(post => post.id !== postId));
            setFilteredPosts(filteredPosts.filter(post => post.id !== postId));
            toast.success("Objava je uspješno obrisana.");
        } catch (error) {
            console.error('Neuspješno obrisana objava:', error);
            toast.error("Greška prilikom brisanja objave.");
        }
    };

    const handleUpdatePost = (updatedPost) => {
        setPosts(prevPosts => prevPosts.map(post => post.id === updatedPost.id ? updatedPost : post));
        setFilteredPosts(prevPosts => prevPosts.map(post => post.id === updatedPost.id ? updatedPost : post));
    };

    const handleAddPost = (newPost) => {
        setPosts(prevPosts => [...prevPosts, newPost]);
        setFilteredPosts(prevPosts => [...prevPosts, newPost]);
    };

    const handlePreview = (postId) => {
        const post = posts.find(post => post.id === postId);
        console.log(post);
        setSelectedPost(post);
        setIsPreviewPostPopupOpen(true);
    };

    const handleSearch = async (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.trim() === '') {
            setFilteredPosts(posts);
            return;
        }

        try {
            const response = await makeAdminRequest.get(`/search-posts?query=${query}`);
            setFilteredPosts(response.data);
        } catch (error) {
            console.error('Greška u pretrazi objava:', error);
            setFilteredPosts([]);
        }
    };

    return (
        <div className="admin-page-posts">
            <div className="admin-header-posts">Upravljanje objavama</div>
            <div className="admin-content-posts">
                <button className="add-post-btn" onClick={() => setIsAddPostPopupOpen(true)}>Dodaj objavu</button>
                <div className="admin-search-posts">
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Pretraži objave po imenu korisnika..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="admin-search-input"
                    />
                </div>
                <div className="admin-posts-table-posts">
                    <div className="table-header-posts">
                        <div className="table-cell-posts">ID</div>
                        <div className="table-cell-posts">Deskripcija</div>
                        <div className="table-cell-posts">Slika</div>
                        <div className="table-cell-posts">Korisnik</div>
                        <div className="table-cell-posts">Kreirano</div>
                        <div className="table-cell-posts">Akcije</div>
                    </div>
                    {filteredPosts.map((post) => (
                        <div className="table-row-posts" key={post.id}>
                            <div className="table-cell-posts">{post.id}</div>
                            <div className="table-cell-posts">{post.desc}</div>
                            <div className="table-cell-posts">
                                {post.img ? (
                                    <img src={"/upload/" + post.img} alt="Post" className="post-pic-posts" />
                                ) : (
                                    "Nema slike"
                                )}
                            </div>
                            <div className="table-cell-posts">{post.userName}</div>
                            <div className="table-cell-posts">{new Date(post.createdAt).toLocaleDateString()}</div>
                            <div className="table-cell-posts actions-posts">
                                <PreviewIcon onClick={() => handlePreview(post.id)} className="action-icon-posts" />
                                <EditIcon onClick={() => handleUpdate(post.id)} className="action-icon-posts" />
                                <DeleteIcon onClick={() => handleDelete(post.id)} className="action-icon-posts black" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isAddPostPopupOpen && <AddPostPopup setIsAddPostPopupOpen={setIsAddPostPopupOpen} onPostAdded={handleAddPost} />}
            {isUpdatePostPopupOpen && <UpdatePostPopup setIsUpdatePostPopupOpen={setIsUpdatePostPopupOpen} post={selectedPost} onPostUpdated={handleUpdatePost} />}
            {isPreviewPostPopupOpen && <PreviewPostPopup setIsPreviewPostPopupOpen={setIsPreviewPostPopupOpen} post={selectedPost} />}
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

export default AdminPosts;
