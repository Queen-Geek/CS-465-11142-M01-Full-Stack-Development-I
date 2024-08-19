const mongoose = require('mongoose');
const Trip = require('../models/travlr');
const Model = mongoose.model('trips');

// GET: /trips - list all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

        // Uncomment the following code to show query results in console
        console.log(q);


    if (!q) {
        // DB returns no data
        return res
            .status(404)
            .json(err);
    }

    else {
        return res
            .status(200)
            .json(q);
    }
};

// POST: /trips - Adds a new trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip ({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

        if(!q) {
            // Database return no data
            return res
                .status(400)
                .json(err);
        }

        else {
            return res
                .status(201)
                .json(q);
        }
};

const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({ code : req.params.tripCode }) // Returns single recod
        .exec();

        // Uncomment the following code to show query results in console
        console.log(q);


    if (!q) {
        // DB returns no data
        return res
            .status(404)
            .json(err);
    }

    else {
        return res
            .status(200)
            .json(q);
    }
};


module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip
}