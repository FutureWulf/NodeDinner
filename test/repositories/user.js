var assert = require('assert');
var app = require('../../app');
var request = require('supertest');
var sinon = require('sinon');
var userDb = require('../../db/userRepository');
var mongoose = require('mongoose');
var UserSchema = require('../../models/user');

describe('Users Respository', function () {

  var user = {
    username: 'BrianG',
    password: 'password1',
  };

  before(function (done) {
    mongoose.connection.db.dropDatabase(function (err) {
      if (err) throw err;
      request(app)
        .post('/User')
        .send(user)
        .expect(201)
        .done();
    });
  });

  after(function (done) {
    mongoose.connection.db.dropDatabase(function (err) {
      if (err) throw err;
      done(err);
    });
  });

  it.skip('GetAll returns all users', function (done) {
    userDb.GetAll(function (results) {
      assert.equal(results.length, 2);
      done();
    });
  });
});
