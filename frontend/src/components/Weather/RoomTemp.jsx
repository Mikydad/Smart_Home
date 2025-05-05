import React, { useEffect, useState } from 'react';
import { listenForSensorData } from '../../socket'; // Using the exported function

const CircleDisplay = ({ title, value }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  }}>
    <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{title}</div>
    <div style={{
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
    }}>
      {value}
    </div>
  </div>
);

const RoomTemperature = () => {
  const [temperature, setTemperature] = useState('--');
  const [humidity, setHumidity] = useState('--');

  useEffect(() => {
    const handleSensorData = (data) => {
      setTemperature(`${data.temperature}°C`);
      setHumidity(`${data.humidity}%`);
      console.log('Temperature:', data.temperature);
      console.log('Humidity:', data.humidity);
      console.log('Motion:', data.motionDetected);
    };

    listenForSensorData(handleSensorData);

    return () => {
      // Manually clean up if needed, but socket.js abstracts it.
    };
  }, []);

  return (
    <div style={{
      display: 'flex',
      gap: '40px',
      width: 'auto',
      padding: '40px',
      height: '200px',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#e0f7fa',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }}>
      <CircleDisplay title="Temperature" value={temperature} />
      <CircleDisplay title="Humidity" value={humidity} />
    </div>
  );
};

export default RoomTemperature;
