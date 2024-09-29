import React from 'react';
import './Home.css';
import sensorImage from '../assets/images/sensor.jpg'; // Correct path

function Home() {
  return (
    <div className="home-container"
      style={{ backgroundImage: `url(${sensorImage})` }} // Apply the image
    >
      <h1>Welcome to sensor</h1>
      <p>This is the home page.</p>
    </div>
  );
};

export default Home;
