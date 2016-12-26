// grab the house model we just created
const express = require('express');
const House = require('./models/house');
const router = express.Router();
const http = require('http');
const request = require("request");

// server routes ===========================================================
// handle things like api calls
// authentication routes
router.route('/houses')
  .post(function (req, res) {

    let house = new House();
    house.name = req.body.name;

    house.save(function (err) {
      if (err) {
        res.send(err);
      }

      res.json({
        message: 'houseCreated',
        status: 'success'
      });
    });
  })
  .get(function (req, res) {
    // use mongoose to get all houses in the database
    return House.find(function (err, houses) {

      // if there is an error retrieving, send the error. 
      // nothing after res.send(err) will execute
      if (err) {
        res.send(err);
      }

      res.json(houses); // return all houses in JSON format
    });


  });

// route to handle creating goes here (app.post)
// route to handle delete goes here (app.delete)

// frontend routes =========================================================
// route to handle all angular requests
module.exports = router;