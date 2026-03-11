const express = require('express');
const router = express.Router();
const Incident = require('../models/Incident');

// POST /api/report - Submit anonymous incident report
router.post('/report', async (req, res) => {
    try {
        const { type, location, description, timestamp } = req.body;

        const newIncident = new Incident({
            type,
            location,
            description, // Should be anonymized by middleware eventually
            timestamp: timestamp || new Date()
        });

        await newIncident.save();
        res.status(201).json({ message: 'Incident reported successfully', incident: newIncident });
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
