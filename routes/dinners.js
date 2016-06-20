var express = require('express');
var dinnersDb = require('../db/dinnerRepository');

var router = express.Router();

router
  .get('/', function (req, res) {
    var result = dinnersDb.FindAllDinners();
    res.status(200).send({ result: result });
  })

  .get('/:id', function (req, res) {
    var id = req.params.id;
    var result = dinnersDb.FindDinnerById(id);
    res.status(200).send({
      id: id,
      message: 'Hello',
    });
  })

  .post('/', function (req, res) {
    var title = req.body.title;
    dinnersDb.CreateDinner();
    res.status(200).send(title + ' is saved');
  })

  .put('/:id', function (req, res) {
    var title = req.body.title;
    var id = req.params.id;
    dinnersDb.UpdateDinner(id);
    res.status(200).send(title + ' is updated');
  })

  .delete('/:id', function (req, res) {
    var id = req.params.id;
    dinnersDb.DeleteDinner(id);
    res.status(200).send('Dinner id: ' + id + ' was deleted');
  });

module.exports = router;
