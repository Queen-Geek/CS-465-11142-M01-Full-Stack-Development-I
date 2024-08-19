const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

router
    .route('/trips')
    .get((req, res) => {
        console.log('GET /api/trips hit');
        tripsController.tripsList(req, res);
    })
    .post((req, res) => {
        console.log('POST /api/trips hit');
        tripsController.tripsAddTrip(req, res);
    });

module.exports = router;