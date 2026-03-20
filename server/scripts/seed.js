const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const Incident = require('../models/Incident');

const sampleIncidents = [
    {
        type: 'harassment',
        location: { lat: 18.5204, lng: 73.8567, address: 'Main Campus East Gate' },
        description: 'Verbal harassment observed nearby.',
        lighting_condition: 'well_lit',
        crowd_density: 'moderate',
        atmosphere: 'tense',
        severity_score: 5
    },
    {
        type: 'unsafe_lighting',
        location: { lat: 18.5215, lng: 73.8585, address: 'Library Back Alley' },
        description: 'Street lights completely out for 50m.',
        lighting_condition: 'dark',
        crowd_density: 'low',
        atmosphere: 'uncomfortable',
        severity_score: 4
    },
    {
        type: 'stalking',
        location: { lat: 18.5190, lng: 73.8550, address: 'Sector 4 Metro Path' },
        description: 'Suspicious vehicle following slow.',
        lighting_condition: 'dimly_lit',
        crowd_density: 'deserted',
        atmosphere: 'dangerous',
        severity_score: 8
    },
    {
        type: 'loitering',
        location: { lat: 18.5220, lng: 73.8570, address: 'Dorm Block B' },
        description: 'Unidentified group standing in fire exit.',
        lighting_condition: 'well_lit',
        crowd_density: 'low',
        atmosphere: 'uncomfortable',
        severity_score: 3
    }
];

async function seed() {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pwsis';

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
