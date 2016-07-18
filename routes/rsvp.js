var express = require('express');
var dinnersDb = require('../db/dinnerRepository');
var router = express.Router();

router
  .put('/:id', function (req, res) {
    var dinner = req.body;
    var id = req.params.id;
    if (!isMongoId(id)) { res.status(400).send('Not a valid ID'); } else {
      dinnersDb.UpdateDinner(dinner, function (result) {
        res.status(201).send(result);
      });
    }
  });

function isMongoId(id) {
  var regex = new RegExp(/^[0-9a-fA-F]{24}$/);
  if (regex.test(id) === true) { return true; } else { return false; }
}

module.exports = router;
