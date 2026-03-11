require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Connect to MongoDB (skip connection error for now if local mongo is not running, just log it)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/a3jsecure')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err.message);
        console.log('💡 Tip: Make sure MongoDB is running or provide a valid MONGODB_URI in .env');
    });

server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
