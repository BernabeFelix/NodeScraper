// grab the house model we just created
var express = require('express');
var House = require('./models/house');
var router = express.Router();

// server routes ===========================================================
// handle things like api calls
// authentication routes

// sample api route
router.get('/houses', function (req, res) {
  // use mongoose to get all houses in the database
  return House.find(function (err, houses) {

    // if there is an error retrieving, send the error. 
    // nothing after res.send(err) will execute
    if (err) {
      console.log('error: ' + err);
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