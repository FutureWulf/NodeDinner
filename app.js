var express = require('express');
var dinnersRoute = require('./routes/dinners');
var app = express();

var port = process.env.port || 3000;

app.use('/Dinners', dinnersRoute);

app.get('/', function (req, res) {
  res.status(200).send('Hello world');
});

app.listen(port, function () {
  console.log('Server is running on port: ' + port);
});

module.exports = app;
