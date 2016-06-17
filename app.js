var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/home'));
app.use('/Dinners', require('./routes/dinners'));

app.get('/', function (req, res) {
  res.status(200).send('Hello world');
});

app.listen(port, function () {
  console.log('Server is running on port: ' + port);
});

module.exports = app;
