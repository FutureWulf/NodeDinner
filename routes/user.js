var express = require('express');
var router = express.Router();

module.exports = function (router, passport) {
  router
    .get('/signup', function (req, res) {
      res.status(200).send('Signup GET');
    })

    .post('/signup', passport.authenticate('local-signup', {
      successRedirect: '/profile',
      failureRedirect: '/signup',
      failureFlash: true,
    }))

    .get('/profile', function (req, res) {
      res.status(200).send('Profile GET');
    });
};
