// commandHandler.js
import { SerialPort } from 'serialport';

// Example command handler
export const turnFanOn = (serialPort) => {
  serialPort.write('TURN_FAN_ON\n', (err) => {
    if (err) {
      console.error('Error turning on fan:', err);
    } else {
      console.log('Fan turned on');
    }
  });
};

export const turnFanOff = (serialPort) => {
  serialPort.write('TURN_FAN_OFF\n', (err) => {
    if (err) {
      console.error('Error turning off fan:', err);
    } else {
      console.log('Fan turned off');
    }
  });
};
