// import express from 'express';
// import http from 'http';
// import cors from 'cors';
// import { Server } from 'socket.io';
// import { setupSocketHandlers } from './sockets/handlers.js'; // ← Proper import
// import { config } from 'dotenv';

// config(); // Load environment variables from .env file
// app.use('/routes', auth);

// mongoose.connect(process.env.MONGO_URI).then(() => {
//   console.log('MongoDB connected');
// });


// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:5173',
//     methods: ['GET', 'POST'],
//   },
// });

// app.use(cors());
// app.use(express.json());

// const handleLightCommand = (action, intensity) => {
//   console.log(`Light action: ${action}, Intensity: ${intensity}`);
//   if (action === 'on') {
//     console.log(`Turning on the light with intensity: ${intensity}`);
//   } else if (action === 'off') {
//     console.log('Turning off the light');
//   } else {
//     console.log('Unknown light action');
//   }
// };

// io.on('connection', (socket) => {
//   console.log('A client connected');

//   setupSocketHandlers(socket, io); // ✅ Make sure io is passed

//   socket.on('light-command', (data) => {
//     const { action, intensity } = data;
//     handleLightCommand(action, intensity);
//   });

//   socket.on('toggle-ac', ({ isOn }) => {
//     console.log(`Received toggle-ac: AC is now ${isOn ? 'ON' : 'OFF'}`);
//     // You can add further logic here to control hardware or simulate
//   });
  
//   socket.on('adjust-temperature', ({ temperature }) => {
//     console.log(`Received adjust-temperature: ${temperature}°C`);
//     // Add any control logic here
//   });

//   socket.on('turn-off-light', () => {
//     console.log('Turn off light command received');
//     // Optional: You can add hardware control or any simulation here
//     io.emit('light-status', { status: 'off' }); // Notify frontend that the light is off
//   });

//   socket.on('trigger-alarm', () => {
//     // 1. Activate buzzer (hardware command)
//     // 2. Send notification to user (email, push, etc.)
//     console.log('🚨 Motion detected while away/asleep. Buzzing alarm...');
//   });
  
//   socket.on('door-toggle', () => {
//     console.log('Door toggled');
//     // Add any control logic here
//   }
//   );
  
//   socket.on('disconnect', () => {
//     console.log('A client disconnected');
//   });
// });

// server.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });
















import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { setupSocketHandlers } from './sockets/handlers.js';
import { config } from 'dotenv';
import auth from './routes/auth.js'; // <-- assuming you created this
config(); // Load .env variables

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', auth);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('✅ MongoDB connected');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Your device control handlers
const handleLightCommand = (action, intensity) => {
  console.log(`Light action: ${action}, Intensity: ${intensity}`);
  if (action === 'on') {
    console.log(`Turning on the light with intensity: ${intensity}`);
  } else if (action === 'off') {
    console.log('Turning off the light');
  } else {
    console.log('Unknown light action');
  }
};

// Socket.IO handlers
io.on('connection', (socket) => {
  console.log('⚡ A client connected');

  setupSocketHandlers(socket, io); // if you want to modularize socket events

  socket.on('light-command', ({ action, intensity }) => {
    handleLightCommand(action, intensity);
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
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
