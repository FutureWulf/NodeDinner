var express = require('express');
var dinnersDb = require('../db/dinnerRepository');

var router = express.Router();

router
  .get('/', function (req, res) {
    dinnersDb.GetAll(function (result) {
      res.status(200).send(result);
    });
  })

  .get('/:id', function (req, res) {
    var id = req.params.id;
    if (!isMongoId(id)) { res.status(404).send('Dinner not found'); } else {
      dinnersDb.GetOne({ _id: id }, function (result) {
        res.status(200).send(result);
      });
    }
  })

  .post('/', function (req, res) {
    var dinner = req.body;
    dinnersDb.CreateDinner(dinner, function (result) {
      res.status(201).send(result);
    });
  })

  .put('/:id', function (req, res) {
    var dinner = req.body;
    var id = req.params.id;
    if (!isMongoId(id)) { res.status(404).send('Dinner not found'); } else {
      dinnersDb.UpdateDinner(dinner, function (result) {
        res.status(201).send(result);
      });
    }
  })

  .delete('/:id', function (req, res) {
    var id = req.params.id;
    dinnersDb.DeleteDinner(id);
    res.status(204).send('Dinner id: ' + id + ' was deleted');
  });

function isMongoId(id) {
  var regex = new RegExp(/^[0-9a-fA-F]{24}$/);
  if (regex.test(id) === true) { return true; } else { return false; }
}

module.exports = router;
