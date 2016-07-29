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

exports.UpdateUser = function (req, callback) {
  UserSchema.findOne({ _id: req._id }, function (err, user) {
    if (err) throw err;
    if (!user) { callback(user); } else {
      user.username = req.username || user.username;
      user.password = req.password || user.password;

      user.save(function (err, results) {
        if (err) throw err;
        callback(results);
      });
    }
  });
};

exports.DeleteUser = function (id, callback) {
  UserSchema.findOne({ _id: id }, function (err, user) {
    if (err) throw err;
    if (!user) { callback(user); } else {
      user.remove(function (err, results) {
        if (err) throw err;
        callback(results);
      });
    }
  });
};
