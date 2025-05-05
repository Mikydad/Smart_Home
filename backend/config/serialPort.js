// serial/serialPort.js
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';

export function initSerial(onDataCallback) {
  const port = new SerialPort({
    path: '/dev/tty.usbmodem1442301', // change as needed
    baudRate: 9600,
  });

  const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

  parser.on('data', (data) => {
    console.log('From Arduino:', data.trim());
    onDataCallback(data.trim());
  });

  return port;
}
