const mongoose = require('mongoose');

const userSettingSchema = new mongoose.Schema({
    userId: {
        type: String, // Anonymous ID or unique device ID
        required: true,
        unique: true
    },
    emergencyContacts: [
        {
            name: { type: String, required: true },
            phone: { type: String, required: true },
            relation: { type: String }
        }
    ],
    pwsisMode: {
        type: String,
        enum: ['standard', 'high_risk', 'silent'],
        default: 'standard'
    },
    voiceActivationEnabled: {
        type: Boolean,
        default: true
    },
    inactivityDetectionEnabled: {
        type: Boolean,
        default: false
    },
    inactivityThreshold: {
        type: Number, // in minutes
        default: 15
    }
}, { timestamps: true });

module.exports = mongoose.model('UserSetting', userSettingSchema);
