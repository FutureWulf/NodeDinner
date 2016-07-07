var express = require('express');
var router = express.Router();

router
  .put('/:id', function (req, res) {
    res.status(201).send('You have been RSVP\'d!');
  });

module.exports = router;
