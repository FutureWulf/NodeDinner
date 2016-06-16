var express = require('express');

var app = express();

var port = process.env.port || 3000;

app.get('/', function (req, res) {
  res.status(200).send('Hello world');
});

app.listen(port, function () {
  console.log('Server is running on port: ' + port);
});

module.exports = app;
