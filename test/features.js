var assert = require('assert');
var app = require('../app');
var request = require('supertest');
var sinon = require('sinon');
var dinnersDb = require('../db/dinnerRepository');
var mongoose = require('mongoose');
var DinnerSchema = require('../models/dinner');

describe('Creating, Updating and Deleting', function () {

  before(function (done) {
    mongoose.connection.db.dropDatabase(function (err) {
      if (err) throw err;
      done();
    });
  });

  after(function (done) {
    mongoose.connection.db.dropDatabase(function (err) {
      if (err) throw err;
      done();
    });
  });

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

  it('Creating a dinner saves the dinner to DB', function (done) {
    request(app)
      .post('/Dinners')
      .send(dinner)
      .expect(201)
      .end(findResponseInDB);

    function findResponseInDB(error, response) {
      if (error) throw error;
      dinnersDb.GetOne({ _id: response.body._id }, function (result) {
        assert.equal(result._id, response.body._id);
        done();
      });
    }
  });

  it('Updating a dinner updates the document in DB', function (done) {
    dinnersDb.GetOne({ title: 'A Test Dinner' }, updateDocument);

    function updateDocument(result) {
      var dinner = result;
      var id = dinner._id;
      dinner.title = 'A Silly Dinner';

      request(app)
        .put('/Dinners/' + id)
        .send(dinner)
        .expect(201)
        .end(findResponseInDB);

      function findResponseInDB(error, response) {
        if (error) throw error;
        dinnersDb.GetOne({ _id: response.body._id }, function (result) {
          assert.equal(result.title, 'A Silly Dinner');
          done();
        });
      }
    }
  });
});
