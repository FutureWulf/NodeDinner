var mongoose = require('mongoose');
var DinnerSchema = require('../models/dinner');

exports.FindAllDinners = function () {
  DinnerSchema.find({}, function (err, results) {
    return results;
  });
};

exports.FindDinnerById = function (args, next) {

};

exports.CreateDinner = function (args, next) {

};

exports.UpdateDinner = function (args, next) {

};

exports.DeleteDinner = function (args, next) {

};
