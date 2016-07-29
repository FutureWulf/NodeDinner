var mongoose = require('mongoose');
var UserSchema = require('../models/user');

exports.GetAll = function (callback) {
  UserSchema.find({}, function (err, results) {
    if (err) throw err;
    callback(results);
  });
};

exports.GetOne = function (query, callback) {
  UserSchema.findOne(query, function (err, results) {
    if (err) throw err;
    callback(results);
  });
};

exports.CreateUser = function (req, callback) {
  var user = new UserSchema({
    username: req.username,
    passwword: req.password,
  });

  user.save(function (err, results) {
    if (err) throw err;
    callback(results);
  });
};
