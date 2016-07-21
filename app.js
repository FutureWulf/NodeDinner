var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var config = require('./config/config');

var app = express();

// Environment
var env = config.env;

// Mongo
var uri = config.db[env];
mongoose.Promise = global.Promise;
mongoose.connect(uri);

require('./config/passport')(passport);

// General Using Statements
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Session and Passport
app.use(session({
  secret: 'memesmeltsteelbeams',
  resave: false,
  saveUninitialized: false, }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
app.use('/', require('./routes/home'));
app.use('/Dinners', require('./routes/dinners'));
app.use('/RSVP', require('./routes/rsvp'));
app.use('/User', require('./routes/user'));

// Listen
app.listen(config.port, function () {
  console.log('Server is running on port: ' + config.port);
});

module.exports = app;
