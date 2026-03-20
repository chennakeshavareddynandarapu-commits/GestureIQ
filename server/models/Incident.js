const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['harassment', 'stalking', 'unsafe_lighting', 'suspicious_activity', 'loitering', 'isolated_area', 'poor_visibility', 'other']
    },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        address: { type: String }
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: false
    },
    severity_score: {
        type: Number,
        default: 1 // 1-10
    },
    lighting_condition: {
        type: String,
        enum: ['well_lit', 'dimly_lit', 'dark', 'no_lighting'],
        default: 'well_lit'
    },
    crowd_density: {
        type: String,
        enum: ['crowded', 'moderate', 'low', 'deserted'],
        default: 'moderate'
    },
    atmosphere: {
        type: String,
        enum: ['safe', 'tense', 'uncomfortable', 'dangerous'],
        default: 'safe'
    },
    is_anonymous: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Incident', incidentSchema);
