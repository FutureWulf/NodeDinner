var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config/config');

var app = express();

// Environment
var env = config.env;

// Mongo
var uri = config.db[env];
mongoose.Promise = global.Promise;
mongoose.connect(uri);

// Using
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/', require('./routes/home'));
app.use('/Dinners', require('./routes/dinners'));
app.use('/RSVP', require('./routes/rsvp'));

// Listen
app.listen(config.port, function () {
  console.log('Server is running on port: ' + config.port);
});

module.exports = app;
