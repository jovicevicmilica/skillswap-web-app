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
    //PRIKAZ OBJAVA NA STRANI ADMINA
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isAddPostPopupOpen, setIsAddPostPopupOpen] = useState(false);
    const [isUpdatePostPopupOpen, setIsUpdatePostPopupOpen] = useState(false);
    const [isPreviewPostPopupOpen, setIsPreviewPostPopupOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchPosts(); //dobijemo objave
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await makeAdminRequest.get('/posts'); //api za dobijanje objava
            setPosts(response.data); 
            setFilteredPosts(response.data);
        } catch (error) {
            console.error('Neuspješno dohvaćene objave:', error);
        }
    };

    const handleUpdate = (postId) => {
        const post = posts.find(post => post.id === postId); //nađemo selektovanu objavu, postavimo je, i otvaramo popup
        setSelectedPost(post);
        setIsUpdatePostPopupOpen(true);
    };

    const handleDelete = async (postId) => {
        try {
            await makeAdminRequest.delete(`/posts/${postId}`); //brišemo određenu objavu, i ažuriramo objave i filterovane objave
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
        //na mjestu stare objave ide nova
    };

    const handleAddPost = (newPost) => {
        setPosts(prevPosts => [...prevPosts, newPost]);
        setFilteredPosts(prevPosts => [...prevPosts, newPost]);
        //među stare objave se dodaje nova
    };

    const handlePreview = (postId) => {
        const post = posts.find(post => post.id === postId);
        console.log(post);
        setSelectedPost(post); //odabran je post za preview
        setIsPreviewPostPopupOpen(true); //otvaramo popup
    };

    const handleSearch = async (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query); //pretraga objava po korisnicima

        if (query.trim() === '') {
            setFilteredPosts(posts); //ako ništa nije unijeto, prikažemo sve objave
            return;
        }

        try {
            const response = await makeAdminRequest.get(`/search-posts?query=${query}`); //vršimo pretragu
            setFilteredPosts(response.data); //filterišemo objave
        } catch (error) {
            console.error('Greška u pretrazi objava:', error);
            setFilteredPosts([]);
        }
    };

    const sanitizeDescription = (desc) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = desc;

        tempDiv.querySelectorAll('a').forEach(anchor => {
            anchor.removeAttribute('href'); //kao i za preview, mičemo da admin može da posjeti profile
            anchor.style.color = 'blue';
            anchor.style.textDecoration = 'none';
        });

        return tempDiv.innerHTML;
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
                            <div className="table-cell-posts" dangerouslySetInnerHTML={{ __html: sanitizeDescription(post.desc) }}></div>
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
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default AdminPosts;
