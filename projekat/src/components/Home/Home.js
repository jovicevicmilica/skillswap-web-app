import React, { useEffect, useState } from 'react';
import './Home.css';
import Posts from '../Posts/Posts';
import Share from '../Share/Share';

const Home = () => {

  return (
    <div className="home">
        <Share />
        <Posts />
    </div>
  )
}

export default Home;