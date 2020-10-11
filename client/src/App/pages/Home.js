import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
    <div className="App">
      <h1>Welcome</h1>
        <p>
            Please <Link to={'./signin'}>Sign In</Link> OR <Link to={'./signin'}>Sign Up</Link>
        </p>
    </div>
    );
}
export default Home;