// import React from 'react';
// import './air-power.css'
// const AirPower = () => {
//     return (
//         <div className="air-power-container">
//             <h1 className="title">Air Conditioning</h1>
//             <div className="button-group">
//                 <div className="large-btn">
//                 <button className="large-button">P</button>
//                 </div>
//                 <div className="small-buttons">
//                     <button className="small-button">+</button>
//                     <button className="small-button">-</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AirPower;




import React, { useState } from 'react';
import { toggleAC, adjustTemperature } from '../../../socket';
import './air-power.css';

const AirPower = () => {
  const [isOn, setIsOn] = useState(false); // Track AC state
  const [temperature, setTemperature] = useState(20); // Track current temperature

  const handleTogglePower = () => {
    // Toggle the AC state
    setIsOn(!isOn);
    toggleAC(!isOn);  // Emit event to backend
  };

  const handleIncreaseTemp = () => {
    // Increase the temperature by 1
    setTemperature(temperature + 1);
    adjustTemperature(temperature + 1); // Emit event to backend
  };

  const handleDecreaseTemp = () => {
    // Decrease the temperature by 1
    setTemperature(temperature - 1);
    adjustTemperature(temperature - 1); // Emit event to backend
  };

  return (
    <div className="air-power-container">
      <h1 className="title">Air Conditioning</h1>
      <div className="button-group">
        <div className="large-btn">
          <button className="large-button" onClick={handleTogglePower}>
            {isOn ? 'Turn Off' : 'Turn On'}
          </button>
        </div>
        <div className="small-buttons">
          <button className="small-button" onClick={handleIncreaseTemp}>+</button>
          <button className="small-button" onClick={handleDecreaseTemp}>-</button>
        </div>
      </div>
      <div className="temperature-display">
        <p>Current Temperature: {temperature}°C</p>
      </div>
    </div>
  );
};

export default AirPower;

