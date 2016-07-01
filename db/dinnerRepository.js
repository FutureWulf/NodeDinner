var mongoose = require('mongoose');
var DinnerSchema = require('../models/dinner');

exports.FindAllDinners = function (callback) {
  DinnerSchema.find({}, function (err, results) {
    if (err) throw err;
    callback(results);
  });
};

exports.FindDinnerById = function (id, callback) {
  DinnerSchema.findOne({ _id: id }, function (err, results) {
    if (err) throw err;
    callback(results);
  });
};

exports.GetOne = function (query, callback) {
  DinnerSchema.findOne(query, function (err, results) {
    if (err) throw err;
    callback(results);
  });
};

exports.CreateDinner = function (req, callback) {
  var dinner = new DinnerSchema({
    title: req.title,
    eventDate: req.eventDate,
    description: req.description,
    hostedBy: req.hostedBy,
    contactPhone: req.contactPhone,
    address: req.address,
    city: req.city,
    state: req.state,
    rsvp: [],
  });

  dinner.save(function (err, results) {
    if (err) console.log(err);
    callback(results);
  });
};

exports.UpdateDinner = function (req, callback) {

};

exports.DeleteDinner = function (args, next) {

};
