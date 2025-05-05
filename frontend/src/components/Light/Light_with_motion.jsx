import React, { useEffect, useState, useRef } from 'react';
import socket, { listenForSensorData, setMotionDelay, turnOffLight } from '../../socket';
import './light-ctrol.css';

const LightWithMotion = () => {
  const [motion, setMotion] = useState(null);
  const [delayMinutes, setDelayMinutes] = useState(5);
  const [lightsOn, setLightsOn] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleSensorData = (data) => {
      const detected = data.motionDetected;
      console.log('Motion data received:', detected);
      setMotion(detected);

      if (detected) {
        setLightsOn(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
          console.log('Motion detected again, timer cleared.');
        }
      } else {
        if (!timeoutRef.current) {
          timeoutRef.current = setTimeout(() => {
            console.log(`No motion for ${delayMinutes} minute(s). Sending turn-off command.`);
            setLightsOn(false);
            turnOffLight(); // Send command to turn off the light
            timeoutRef.current = null;
          }, delayMinutes * 60 * 1000); // Convert minutes to milliseconds
        }
      }
    };

    listenForSensorData(handleSensorData);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [delayMinutes]);

  const handleSetDelay = (e) => {
    e.preventDefault();
    const minutes = parseInt(e.target.minutes.value);
  
    if (!isNaN(minutes) && minutes >= 0) {
      setDelayMinutes(minutes);
      console.log(`Auto turn-off delay set to ${minutes} minute(s)`);
      setMotionDelay(minutes); // optional backend update
  
      if (minutes === 0) {
        console.log('Delay is 0, sending turn-off command immediately.');
        setLightsOn(false);
        turnOffLight(); // 🔌 Send command to backend
      }
    } else {
      console.error('Invalid input for delay minutes');
    }
  };
  

  return (
    <div className="light-control-container">
      <h2 className="light-title">Light with Motion</h2>
      <p>Motion: {motion === null ? 'Waiting...' : motion ? 'Detected' : 'None'}</p>
      <p>Light: {lightsOn ? '🟢 ON' : '⚫️ OFF'}</p>

      <form onSubmit={handleSetDelay}>
        <label>
          Auto turn off after no motion (minutes):
          <input type="number" name="minutes" defaultValue={delayMinutes} min="0" />
        </label>
        <button  className='delayButton' type="submit">Set Delay</button>
      </form>
    </div>
  );
};

export default LightWithMotion;
