var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function (passport) {

  // Configure sessions for persistent login
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  },

  function (req, username, password, done) {
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function () {

      User.findOne({ 'local.username': username }, validateUser);

      function validateUser(err, user) {
        if (err)
          return done(err);

        if (user) {
          return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
        } else {

          var newUser = new User();

          newUser.local.username = username;
          newUser.local.password = newUser.generateHash(password);

          newUser.save(function (err) {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      }
    });
  }));
};
