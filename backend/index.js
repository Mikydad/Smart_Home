// index.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // or your frontend URL
    methods: ['GET', 'POST'],
  },
});

// Replace with your actual Arduino port
const serialPort = new SerialPort({
  path: '/dev/tty.usbmodem1442301',
  baudRate: 9600,
});
//Made connection with arduino
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));
//Read data from the serail port.

parser.on('data', (data) => {
  console.log('Data received from Arduino:', data.trim());
  io.emit('motion', data.trim()); // Broadcast to frontend
});
//Broadcast to Frontend using socket.io

app.get('/', (req, res) => {
  res.send('Backend is running');
});
//routes

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
