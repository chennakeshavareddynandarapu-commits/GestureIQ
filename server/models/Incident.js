const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['harassment', 'stalking', 'unsafe_lighting', 'suspicious_activity', 'other']
    },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
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
        default: 1
    },
    is_anonymous: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Incident', incidentSchema);
