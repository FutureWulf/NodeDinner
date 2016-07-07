var mongoose = require('mongoose');
var DinnerSchema = require('../models/dinner');

exports.GetAll = function (callback) {
  DinnerSchema.find({}, function (err, results) {
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
    if (err) throw err;
    callback(results);
  });
};

exports.UpdateDinner = function (req, callback) {
  DinnerSchema.findOne({ _id: req._id }, function (err, dinner) {
    if (err) throw err;
    if (!dinner) { callback(dinner); } else {
      dinner.title = req.title || dinner.title;
      dinner.eventDate = req.eventDate || dinner.eventDate;
      dinner.description = req.description || dinner.description;
      dinner.hostedBy = req.hostedBy || dinner.hostedBy;
      dinner.contactPhone = req.contactPhone || dinner.contactPhone;
      dinner.address = req.address || dinner.address;
      dinner.city = req.city || dinner.city;
      dinner.state = req.state || dinner.state;
      dinner.rsvp = req.rsvp || dinner.rsvp;

      dinner.save(function (err, results) {
        if (err) throw err;
        callback(results);
      });
    }
  });
};

exports.DeleteDinner = function (args, next) {

};
