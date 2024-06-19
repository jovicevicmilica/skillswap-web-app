import React, { useState } from 'react';
import './Gallery.css';
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from '../../axios';

const fetchPostsWithImages = () => {
  return makeRequest.get('/posts/with-images').then(res => res.data);
};

const Gallery = () => {
  //GALERIJA
  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['fetchPostsWithImages'], //pridobijemo sve objave koje imaju slike
    queryFn: fetchPostsWithImages
  });

  const [selectedImage, setSelectedImage] = useState(null);

  if (isLoading) return <div>Učitavam...</div>;
  if (isError) return <div>Greška prilikom učitavanja.</div>;

  const handleImageClick = (post) => {
    setSelectedImage(post); //ako smo odabrali sliku iz galerije
  };

  const closeImage = () => {
    setSelectedImage(null); //ako smo izašli iz slike
  };

  return (
    <div className="gallery">
      <h1>Galerija</h1>
      {posts.length === 0 ? (
        <div className="no-images">Nemate slika.</div>
      ) : (
        <div className="gallery-grid">
          {posts.map(post => (
            <div key={post.id} className="gallery-item" onClick={() => handleImageClick(post)}> {/*klikom na sliku se ona zumira*/}
              <img src={"/upload/" + post.img} alt={post.desc} />
            </div>
          ))}
        </div>
      )}
      {selectedImage && ( /*ako je odabrana slika, pojavljuje se modal*/
        <div className="modal" onClick={closeImage}>
          <span className="close" onClick={closeImage}>&times;</span>
          <div className="modal-content-container">
            <img className="modal-content" src={"/upload/" + selectedImage.img} alt={selectedImage.desc} />
            {selectedImage.desc && <div className="caption" dangerouslySetInnerHTML={{ __html: selectedImage.desc }}></div>}
            {/*opet koristimo dangerouslysethtml zbog opisa, jer je tag predstavljen kao html u bazi, regulacija opisa*/}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;