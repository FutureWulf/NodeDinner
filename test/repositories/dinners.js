var assert = require('assert');
var app = require('../../app');
var request = require('supertest');
var sinon = require('sinon');
var dinnersDb = require('../../db/dinnerRepository');
var mongoose = require('mongoose');
var DinnerSchema = require('../../models/dinner');

describe('Dinners Repository', function () {

  var dinner = {
    title: 'A Test Dinner',
    eventDate: '2016-10-31',
    description: 'A dinner for testing purposes',
    hostedBy: 'Mocha',
    contactPhone: '555-TEST',
    address: '123 Test St.',
    city: 'Testville',
    state: 'TN',
    rsvp: [],
  };

  before(function (done) {
    mongoose.connection.db.dropDatabase(function (err) {
      if (err) throw err;
    });

    request(app)
      .post('/Dinners')
      .send(dinner)
      .expect(201)
      .end(done);
  });

  after(function (done) {
    mongoose.connection.db.dropDatabase(function (err) {
      if (err) throw err;
      done(err);
    });
  });

  it('GetAll returns all dinners', function (done) {
    done();
  });

  it('GetOne returns one dinner', function (done) {
    done();
  });

  it('CreateDinner creates the dinner', function (done) {
    done();
  });

  it('UpdateDinner updates the dinner', function (done) {
    done();
  });

  it('DeleteDinner deletes the dinner', function (done) {
    done();
  });
});
