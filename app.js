var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var config = require('./config/config');

var app = express();

// Environment
var env = config.env;

// Mongo
var uri = config.db[env];
mongoose.Promise = global.Promise;
mongoose.connect(uri);

// General Using Statements
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Session and Passport
app.use(session({
  secret: 'memesmeltsteelbeams',
  resave: false,
  saveUninitialized: false, }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', require('./routes/home'));
app.use('/Dinners', require('./routes/dinners'));
app.use('/RSVP', require('./routes/rsvp'));

// Listen
app.listen(config.port, function () {
  console.log('Server is running on port: ' + config.port);
});

module.exports = app;
