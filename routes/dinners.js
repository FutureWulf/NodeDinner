var express = require('express');
var dinnersDb = require('../db/dinnerRepository');

var router = express.Router();

router
  .get('/', function (req, res) {
    dinnersDb.FindAllDinners(function (result) {
      res.status(200).send(result);
    });
  })

  .get('/:id', function (req, res) {
    var id = req.params.id;
    dinnersDb.FindDinnerById(id, function (result) {
      res.status(200).send(result);
    });
  })

  .post('/', function (req, res) {
    var title = req.body.title;
    dinnersDb.CreateDinner();
    res.status(201).send(title + ' is saved');
  })

  .put('/:id', function (req, res) {
    var title = req.body.title;
    var id = req.params.id;
    dinnersDb.UpdateDinner(id);
    res.status(201).send(title + ' is updated');
  })

  .delete('/:id', function (req, res) {
    var id = req.params.id;
    dinnersDb.DeleteDinner(id);
    res.status(204).send('Dinner id: ' + id + ' was deleted');
  });

module.exports = router;
