import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Nav';


const Home = () => {
    return (
    <div className="App">


      <h1>Project Home</h1>
      {/* Link to List.js */}
      <Link to={'./list'}>
        <button variant="raised">
            My List
        </button>
      </Link>
      <Link to={'./signup'}>
      <button variant="raised">
          Signup
      </button>
      </Link>
    </div>
    );
}
export default Home;