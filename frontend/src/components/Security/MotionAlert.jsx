import React, { useEffect, useState, useRef } from 'react';
import './security-ctrl.css';
import { listenForSensorData, triggerAlarm } from '../../socket';

const MotionAlert = () => {
  const [motionDetected, setMotionDetected] = useState(false);
  const [userStatus, setUserStatus] = useState('home');
  const [alarmTriggered, setAlarmTriggered] = useState(false);

  const userStatusRef = useRef(userStatus);
  userStatusRef.current = userStatus; // Always up-to-date

  useEffect(() => {
    const handleSensorData = (data) => {
      const detected = data.motionDetected;
      console.log('Motion data received:', detected);
      setMotionDetected(detected);

      const currentStatus = userStatusRef.current;
      if (detected) {
        if ((currentStatus === 'away' || currentStatus === 'asleep') && !alarmTriggered) {
          console.log('⚠️ Intrusion detected while user is', currentStatus);
          triggerAlarm();
          setAlarmTriggered(true);
        }
      } else {
        setAlarmTriggered(false); // reset if no motion
      }
    };

    listenForSensorData(handleSensorData);
  }, [alarmTriggered]);

  return (
    <div className="security-panel">
      <div className="status-control">
        <label>User Status:</label>
        <select
          value={userStatus}
          onChange={(e) => setUserStatus(e.target.value)}
        >
          <option value="home">Home</option>
          <option value="away">Away</option>
          <option value="asleep">Asleep</option>
        </select>
      </div>

      <p className={`motion-status ${motionDetected ? 'motion-on' : 'motion-off'}`}>
        Motion: {motionDetected ? 'Detected' : 'None'}
      </p>

      {motionDetected && (userStatus === 'away' || userStatus === 'asleep') && (
        <p className="alert-message">
          🚨 Alert! Motion detected while you are {userStatus}.
        </p>
      )}
    </div>
  );
};

export default MotionAlert;
