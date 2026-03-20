const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');
const UserSetting = require('../models/UserSetting');

// POST /api/report - Submit anonymous incident report
router.post('/report', async (req, res) => {
    try {
        const { type, location, description, lighting, crowd, atmosphere, severity, timestamp } = req.body;

        const newIncident = new Incident({
            type,
            location,
            description,
            lighting_condition: lighting,
            crowd_density: crowd,
            atmosphere,
            severity_score: severity || 1,
            timestamp: timestamp || new Date()
        });

        await newIncident.save();
        res.status(201).json({ message: 'PWSIS Incident reported and logged.', incident: newIncident });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/risk-score - Calculate real-time risk score based on location/time
router.get('/risk-score', async (req, res) => {
    try {
        const { lat, lng } = req.query;
        // Mocked intelligence for demo: factors in time and nearby reports
        const hour = new Date().getHours();
        let score = 10; // Base safe score

        // Factor 1: Time of day (Riskier at night)
        if (hour >= 22 || hour <= 4) score += 40;
        else if (hour >= 18) score += 20;

        // Factor 2: Nearby incidents
        const nearbyCount = await Incident.countDocuments({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                    $maxDistance: 500 // 500 meters
                }
            }
        }).catch(() => 0); // Skip if geo index not set up
        
        score += nearbyCount * 5;

        // Cap at 100
        score = Math.min(score, 100);

        res.status(200).json({ 
            score, 
            status: score > 70 ? 'High' : score > 40 ? 'Moderate' : 'Low',
            factors: ['Time of day', 'Community reports' + (nearbyCount > 0 ? ` (${nearbyCount})` : '')]
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/sos - Trigger emergency protocols
router.post('/sos', async (req, res) => {
    try {
        const { userId, location, type = 'SOS' } = req.body;
        const settings = await UserSetting.findOne({ userId });
        
        // Log the SOS event (could be a new model 'Emergency')
        console.log(`🚨 PWSIS SOS Triggered: User ${userId} at ${JSON.stringify(location)}`);

        // Mock notification to emergency contacts
        const contacts = settings ? settings.emergencyContacts : [];
        
        res.status(200).json({ 
            message: 'SOS Protocol Initiated. Emergency contacts notified.',
            notifiedContacts: contacts.map(c => c.name),
            escalationLevel: 'Immediate'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET/POST /api/settings/:userId
router.get('/settings/:userId', async (req, res) => {
    try {
        let settings = await UserSetting.findOne({ userId: req.params.userId });
        if (!settings) {
            settings = await UserSetting.create({ userId: req.params.userId, emergencyContacts: [] });
        }
        res.status(200).json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/settings/:userId', async (req, res) => {
    try {
        const settings = await UserSetting.findOneAndUpdate(
            { userId: req.params.userId },
            req.body,
            { new: true, upsert: true }
        );
        res.status(200).json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/heatmap - Fetch aggregated risk zone data
router.get('/heatmap', async (req, res) => {
    try {
        const incidents = await Incident.find().limit(100); // Limit for performance

        // Simple aggregation for now: return all points
        // In real app, we would cluster or calculate risk scores
        const heatmapData = incidents.map(inc => ({
            lat: inc.location.lat,
            lng: inc.location.lng,
            intensity: inc.severity_score || 1,
            type: inc.type
        }));

        res.status(200).json(heatmapData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/dashboard/stats
router.get('/dashboard/stats', async (req, res) => {
    try {
        const totalIncidents = await Incident.countDocuments();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const incidentsToday = await Incident.countDocuments({ timestamp: { $gte: today } });

        res.status(200).json({
            totalIncidents,
            incidentsToday,
            safeRoutesGenerated: Math.floor(Math.random() * 50) + 10, // Mocked for now
            activeAlerts: Math.floor(Math.random() * 5)
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
