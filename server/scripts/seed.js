const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const Incident = require('../models/Incident');

const sampleIncidents = [
    {
        type: 'harassment',
        location: { lat: 18.5204, lng: 73.8567 },
        description: 'Verbal harassment near main gate',
        severity_score: 3
    },
    {
        type: 'unsafe_lighting',
        location: { lat: 18.5215, lng: 73.8585 },
        description: 'Street lights flickering or out',
        severity_score: 2
    },
    {
        type: 'stalking',
        location: { lat: 18.5190, lng: 73.8550 },
        description: 'Suspicious individual following for 200m',
        severity_score: 5
    },
    {
        type: 'suspicious_activity',
        location: { lat: 18.5220, lng: 73.8570 },
        description: 'Group of people loitering in unsafe area',
        severity_score: 2
    },
    {
        type: 'other',
        location: { lat: 18.5180, lng: 73.8600 },
        description: 'Unsafe passage due to construction debris',
        severity_score: 1
    }
];

async function seed() {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/a3jsecure';
        console.log('Connecting to:', mongoUri);
        await mongoose.connect(mongoUri);

        await Incident.deleteMany({});
        console.log('Cleared existing incidents');

        await Incident.insertMany(sampleIncidents);
        console.log('✅ Successfully seeded sample incidents');

        process.exit(0);
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
}

seed();
