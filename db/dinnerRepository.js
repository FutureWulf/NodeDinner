var mongoose = require('mongoose');
var DinnerSchema = require('../models/dinner');

exports.FindAllDinners = function (callback) {
  DinnerSchema.find({}, function (err, results) {
    callback(results);
  });
};

exports.FindDinnerById = function (id, callback) {
  DinnerSchema.findOne({ _id: id }, function (err, results) {
    callback(results);
  });
};

exports.CreateDinner = function (dinner, callback) {

};

exports.UpdateDinner = function (args, next) {

};

exports.DeleteDinner = function (args, next) {

};
