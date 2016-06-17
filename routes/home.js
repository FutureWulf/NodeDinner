var express = require('express');
var router = express.Router();

router
  .get('/', function (req, res) {
    res.status(200).send('Hello Dinners!');
  })

  .get('/About', function (req, res) {
    res.sendStatus(200);
  });

module.exports = router;
