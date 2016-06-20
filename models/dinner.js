var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  title: String,
  eventDate: Date,
  description: String,
  hostedBy: String,
  contactPhone: String,
  address: String,
  city: String,
  state: String,
  rsvp: [],
});

var Dinner = mongoose.model('Dinners', schema);

module.exports = Dinner;
