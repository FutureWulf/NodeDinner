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
      .end(insertSecondDinner);

    function insertSecondDinner(err) {
      dinner.title = 'Another Test Dinner';
      request(app)
        .post('/Dinners')
        .send(dinner)
        .expect(201)
        .end(done);
    }
  });

  after(function (done) {
    mongoose.connection.db.dropDatabase(function (err) {
      if (err) throw err;
      done(err);
    });
  });

  it('GetAll returns all dinners', function (done) {
    dinnersDb.GetAll(function (results) {
      assert.equal(results.length, 2);
      done();
    });
  });

  it('GetOne returns the correct dinner', function (done) {
    dinnersDb.GetOne({ title: 'Another Test Dinner' }, compareResults);

    function compareResults(results) {
      assert.equal(results.title, 'Another Test Dinner');
      done();
    }
  });

  it('CreateDinner creates the dinner', function (done) {
    dinner.title = 'CreateDinner Made This';
    dinnersDb.CreateDinner(dinner, compareResults);

    function compareResults(results) {
      assert.equal(results.title, dinner.title);
      done();
    }
  });

  it('UpdateDinner updates the dinner', function (done) {
    dinnersDb.GetOne({ title: 'CreateDinner Made This' }, updateSelectedDinner);

    function updateSelectedDinner(dinnerToUpdate) {
      dinnerToUpdate.title = 'UpdateDinner Updated This';
      dinnersDb.UpdateDinner(dinnerToUpdate, compareResults);
    }

    function compareResults(result) {
      assert.equal(result.title, 'UpdateDinner Updated This');
      done();
    }
  });

  it('DeleteDinner deletes the dinner', function (done) {
    dinnersDb.GetOne({ title: 'UpdateDinner Updated This' }, deleteSelectedDinner);

    function deleteSelectedDinner(dinnerToDelete) {
      dinnersDb.DeleteDinner(dinnerToDelete._id, lookupResponse);
    }

    function lookupResponse(response) {
      dinnersDb.GetOne({ title: response.title }, assertDinnerIsNull);
    }

    function assertDinnerIsNull(result) {
      assert.equal(result, null);
      done();
    }
  });
});
