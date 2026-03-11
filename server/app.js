const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// API Routes
app.use('/api', require('./routes/api'));

// Root API
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to A3Jsecure API' });
});

module.exports = app;
