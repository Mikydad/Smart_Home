import React, { useState } from 'react';
import './security-ctrl.css'
import { listenForSensorData, sendDoorToggle } from '../../socket';
import { data } from 'react-router-dom';
import { useEffect } from 'react';
const SecurityControl = () => {
  const [doorOpen, setDoorOpen] = useState(false);
  const [lastOpened, setLastOpened] = useState('April 13, 2025 - 8:42 PM');
  const [motionDetected, setMotionDetected] = useState(true);
  const [lastMotionTime, setLastMotionTime] = useState('April 13, 2025 - 8:45 PM');
 
  useEffect(() => {
      const handleSensorData = (data) => {
        const detected = data.motionDetected;
        console.log('Motion data received:', detected);
        setMotionDetected(detected)
      }    
      listenForSensorData(handleSensorData);
       })


       const toggleDoor = () => {
        const newDoorState = !doorOpen;
        const now = new Date().toLocaleString();
      
        setDoorOpen(newDoorState);
        setLastOpened(now);
      
        sendDoorToggle({
          doorOpen: newDoorState,
          time: now,
        });
      };
      

  return (
    <div className="security-panel">
      <h2 className="security-title">Security</h2>
      <div className="security-body">
        <div className="security-section">
          <button 
            className={`door-button ${doorOpen ? 'open' : 'closed'}`} 
            onClick={toggleDoor}
          >
            Door is {doorOpen ? 'Open' : 'Closed'}
          </button>
        </div>

        <div className="security-section center">
          <p className="log-label">Last Opened:</p>
          <p className="log-time">{lastOpened}</p>
        </div>

        <div className="security-section">
          <p className={`motion-status ${motionDetected ? 'motion-on' : 'motion-off'}`}>
            Motion: {motionDetected ? 'Detected' : 'None'}
          </p>
          <p className="motion-time">Last Motion: {lastMotionTime}</p>
        </div>
      </div>
    </div>
  );
};

export default SecurityControl;
