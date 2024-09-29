import React from 'react';
import './About.css';
import aboutImage from '../assets/images/about.jpg';

const About = () => {
  return (
    <div className="about-container"
      style={{ backgroundImage: `url(${aboutImage})` }}
    >
      <h1>About</h1>
      <p>
        This is a [sensor page], a [dedicated sensor] displays data. Here [sensor data] is shown.
        This page gives you a little insight into [sensor].
      </p>
    </div>
  );
};

export default About;
