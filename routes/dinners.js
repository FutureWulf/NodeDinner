var express = require('express');
var router = express.Router();

router
  .get('/', function (req, res) {
    res.status(200).send('Hello Dinners!');
  })

  .get('/:id', function (req, res) {
    var id = req.params.id;
    res.status(200).send({
      id: id,
      message: 'Hello',
    });
  })

  .post('/', function (req, res) {
    var title = req.body.title;
    res.status(200).send(title + ' is saved');
  })

  .put('/:id', function (req, res) {
    var title = req.body.title;
    res.status(200).send(title + ' is updated');
  })

  .delete('/:id', function (req, res) {
    var id = req.params.id;
    res.status(200).send('Dinner id: ' + id + ' was deleted');
  });

module.exports = router;
