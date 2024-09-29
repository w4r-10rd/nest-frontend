import React, { useState, useEffect } from 'react';
import './Projects.css';

function Projects() {
  const [sensorData, setSensorData] = useState(null);
  const [wsError, setWsError] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const data = event.data;
      console.log('Received data:', data);
      setSensorData(data); // Update the sensor data state
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setWsError('WebSocket connection error.');
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    // Clean up on component unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-content">
        <h2>Sensor Data</h2>
        {wsError && <p>{wsError}</p>}
        {sensorData ? (
          <p>The current temperature reading is: {sensorData}°C</p>
        ) : (
          <p>Waiting for sensor data...</p>
        )}
      </div>
    </section>
  );
}

export default Projects;
