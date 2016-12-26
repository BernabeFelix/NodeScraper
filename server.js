// modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var apiRoutes = require('./app/apiRoutes')

// configuration ===========================================

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080;

// connect to our mongoDB database 
mongoose.connect(db.uri, db.options);
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function () {
  // Wait for the database connection to establish, then start the app.   
  // startup our app at http://localhost:8080 
  app.listen(port, function () {
    // shoutout to the user
    console.log('Magic happens on port ' + port);
  });
});

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
// configure our routes
app.use('/api', apiRoutes);
app.use('*', function (req, res) {
  console.log('angular');
  res.sendfile('./public/views/index.html'); // load our public/index.html file
});
// start app ===============================================
// expose app           
exports = module.exports = app;