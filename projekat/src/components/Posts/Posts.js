import React from 'react';
import './Posts.css';
import Post from '../Post/Post';

const Posts = () => {
  const posts = [
    {
        id: 1,
        name: "Milica Jovićević",
        userId: 2,
        profilePic: "https://www.shutterstock.com/image-photo/smiling-businesswoman-looking-camera-webcam-600nw-1302585136.jpg",
        desc: "Proba privremene objave na SkillSwap - u.",
        img: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/07/computer-coding.jpg"
    },

    {
        id: 2,
        name: "Nikolina Todorović",
        userId: 1,
        profilePic: "https://www.shutterstock.com/image-photo/young-beautiful-brunette-woman-wearing-600nw-1667900191.jpg",
        desc: "Proba druge privremene objave na SkillSwap - u.",
        img: "https://www.danceflavors.com/wp-content/uploads/2022/09/woman-and-little-girl-dancing-ballet-2022-02-01-22-39-15-utc.jpg.webp"
    },
  ];

  return (
    <div className="posts">
        {posts.map(post=>(
            <Post post={post} key={post.id} />
        ))}
    </div>
  )
}

export default Posts;