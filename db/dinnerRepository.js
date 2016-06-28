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
    else console.log('Saved : ', results);
    callback(results);
  });
};

exports.UpdateDinner = function (args, next) {

};

exports.DeleteDinner = function (args, next) {

};
