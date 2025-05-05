import React, { useState } from 'react';
import socket from '../../socket';
import './light-ctrol.css';

const LightControl = () => {
  const [intensity, setIntensity] = useState(50); // Default intensity at 50%
  const [isOn, setIsOn] = useState(false); // Light state (on/off)

  // Handle "On" button click
  const handleOnClick = () => {
    setIsOn(true);
    socket.emit('light-command', { action: 'on', intensity }); // Send "on" command with current intensity
  };

  // Handle "Off" button click
  const handleOffClick = () => {
    setIsOn(false);
    socket.emit('light-command', { action: 'off', intensity: 0 }); // Send "off" command with 0 intensity
  };

  // Handle slider change for intensity
  const handleIntensityChange = (event) => {
    const newIntensity = event.target.value;
    setIntensity(newIntensity);
    if (isOn) {
      socket.emit('light-command', { action: 'on', intensity: newIntensity }); // Send updated intensity if the light is on
    }
  };

  return (
    <div className="light-control-container">
      <h2 className="light-title">Light</h2>
      <div className="light-control-body">
        <div className="light-status-group">
          <div className={`light-indicator ${isOn ? 'on' : 'off'}`}></div>
          <div className="light-buttons">
            <button className="light-button" onClick={handleOnClick}>On</button>
            <button className="light-button" onClick={handleOffClick}>Off</button>
          </div>
        </div>
        <div className="light-intensity">
          <h3 className="light-intensity-label">Intensity</h3>
          <input
            type="range"
            className="light-slider"
            min="0"
            max="100"
            value={intensity}
            onChange={handleIntensityChange}
          />
        </div>
      </div>
    </div>
  );
};

export default LightControl;
