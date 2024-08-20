const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get((req, res) => {
        console.log("GET request received for trip code:", req.params.tripCode);
        tripsController.tripsFindByCode(req, res);
    })
    .put((req, res) => {
        console.log("PUT request received for trip code:", req.params.tripCode);
        tripsController.tripsUpdateTrip(req, res);
    });


module.exports = router;