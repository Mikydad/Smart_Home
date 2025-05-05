export const setupSocketHandlers = (socket, io) => {
  const sendFakeSensorData = () => {
    const temp = (Math.random() * 10 + 20).toFixed(1);
    const humidity = (Math.random() * 30 + 40).toFixed(1);
    const motionDetected = true; // Random true/false
    const motionTimestamp = motionDetected ? new Date().toISOString() : null; // Only timestamp if motion is detected

    // checking if the fake data is generated correctly
    // console.log('Fake sensor data:', { temp, humidity });

    io.emit('sensor-data', {
      temperature: temp,
      humidity: humidity,
      motionDetected,
      motionTimestamp,
      timestamp: new Date().toISOString(),
    });
  };

  const intervalId = setInterval(sendFakeSensorData, 5000);

  socket.on('light-command', ({ action, intensity }) => {
    console.log(`Light action: ${action}, Intensity: ${intensity}`);
    if (action === 'on') {
      console.log(`Turning on the light with intensity: ${intensity}`);
    } else if (action === 'off') {
      console.log('Turning off the light');
    }
  });

  socket.on('toggle-ac', ({ isOn }) => {
    console.log(`Received toggle-ac: AC is now ${isOn ? 'ON' : 'OFF'}`);
  });

  socket.on('adjust-temperature', ({ temperature }) => {
    console.log(`Received adjust-temperature: ${temperature}°C`);
  });

  socket.on('turn-off-light', () => {
    console.log('Turn off light command received');
    io.emit('light-status', { status: 'off' });
  });

  socket.on('trigger-alarm', () => {
    console.log('🚨 Motion detected. Triggering alarm...');
  });

  socket.on('door-toggle', () => {
    console.log('🚪 Door toggled');
  });

  socket.on('disconnect', () => {
    console.log('❌ A client disconnected');
  });

  // Other socket handlers...
};
