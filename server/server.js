require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');
const DFA = require('./dfa/DFA');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Load DFA configs
const loadDFA = (moduleName) => {
  const configPath = path.join(__dirname, 'dfa', `${moduleName}.dfa.json`);
  try {
    const data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    return new DFA(data);
  } catch (err) {
    console.error(`Error loading DFA config for ${moduleName}:`, err.message);
    return null;
  }
};

// Store active DFAs per user/socket
const activeDFAs = new Map();

io.on('connection', (socket) => {
  console.log('🔗 Client connected:', socket.id);

  socket.on('join_module', (moduleName) => {
    console.log(`📡 Socket ${socket.id} joined module: ${moduleName}`);
    const dfa = loadDFA(moduleName);
    if (dfa) {
      activeDFAs.set(socket.id, dfa);
      socket.emit('dfa_config', {
        name: dfa.name,
        states: dfa.states,
        transitions: dfa.transitions,
        startState: dfa.startState,
        acceptStates: dfa.acceptStates,
        rejectStates: dfa.rejectStates,
        labels: dfa.labels
      });
    }
  });

  socket.on('gesture_event', (gesture) => {
    const dfa = activeDFAs.get(socket.id);
    if (dfa) {
      const result = dfa.transition(gesture);
      socket.emit('dfa_update', result);
      
      // If terminal state, reset after a delay
      if (result.isAccepted || result.isRejected) {
        setTimeout(() => {
          dfa.reset();
          socket.emit('dfa_reset', { currentState: dfa.currentState });
        }, 5000);
      }
    }
  });

  socket.on('reset_dfa', () => {
    const dfa = activeDFAs.get(socket.id);
    if (dfa) {
      dfa.reset();
      socket.emit('dfa_reset', { currentState: dfa.currentState });
    }
  });

  socket.on('disconnect', () => {
    activeDFAs.delete(socket.id);
    console.log('❌ Client disconnected:', socket.id);
  });
});

// Connect to MongoDB (optional — app works without it, DB features degrade gracefully)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/a3jsecure';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.warn('⚠️  MongoDB not available:', err.message);
        console.warn('⚠️  App will run without database features (DFA engine still works).');
    });

server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 WebSocket server ready for DFA connections`);
});
