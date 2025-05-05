
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

// Toggle Light
export const toggleLight = (isOn) => {
  socket.emit('toggle-light', { isOn });
};

// Toggle AC
export const toggleAC = (isOn) => {
  socket.emit('toggle-ac', { isOn });
};

// Adjust Light Intensity
export const adjustLightIntensity = (intensity) => {
  socket.emit('adjust-light-intensity', { intensity });
};

// Adjust Temperature
export const adjustTemperature = (temperature) => {
  socket.emit('adjust-temperature', { temperature });
};

// Light State Listener
export const listenForLightState = (callback) => {
  socket.on('light-state', callback);
};

// Light Intensity Listener
export const listenForLightIntensity = (callback) => {
  socket.on('light-intensity', callback);
};

// Sensor Data Listener (Temperature & Humidity)
export const listenForSensorData = (callback) => {
  socket.on('sensor-data', (data) => {
    console.log('Received sensor-data from backend:', data);
    callback(data);
  });
};

// socket.js
export const turnOffLight = () => {
  socket.emit('turn-off-light');
  console.log('Sent turn-off-light command to backend');
};


export const setMotionDelay = (minutes) => {
  socket.emit('set-motion-delay', { delayMinutes: minutes });
  console.log('Delay sent to backend:', minutes);
};

export const triggerAlarm = () => {
  socket.emit('trigger-alarm'); // Backend should handle this and buzz or notify
};

//Door Control

export const sendDoorToggle = (doorState) => {
  socket.emit('door-toggle', doorState);
};


export default socket;
