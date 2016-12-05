// grab the house model we just created
var House = require('./models/house');

module.exports = function (app) {

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes

  // sample api route
  app.get('/api/houses/', function (req, res) {
    // use mongoose to get all houses in the database
    House.find(function (err, houses) {

      // if there is an error retrieving, send the error. 
      // nothing after res.send(err) will execute
      if (err)
        res.send(err);

      res.json(houses); // return all houses in JSON format
    });
  });

  // route to handle creating goes here (app.post)
  // route to handle delete goes here (app.delete)

  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('*', function (req, res) {
    res.sendfile('./public/views/index.html'); // load our public/index.html file
  });

};