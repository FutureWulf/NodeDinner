var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var schema = mongoose.Schema({
  username: String,
  password: String,
});

schema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

schema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Users', schema);
