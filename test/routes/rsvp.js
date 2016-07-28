var assert = require('assert');
var app = require('../../app');
var request = require('supertest');
var sinon = require('sinon');
var dinnersDb = require('../../db/dinnerRepository');
var mongoose = require('mongoose');
var DinnerSchema = require('../../models/dinner');

describe('RSVP Routes and Functionality', function () {

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
    sinon.spy(dinnersDb, 'UpdateDinner');

    mongoose.connection.db.dropDatabase(function (err) {
      if (err) throw err;

      request(app)
        .post('/Dinners/')
        .send(dinner)
        .end(function (err) {
          if (err) throw err;
          done();
        });
    });
  });

  after(function (done) {
    dinnersDb.UpdateDinner.restore();
    done();

    mongoose.connection.db.dropDatabase(function (err) {
      if (err) throw err;
    });
  });

  it('PUT /RSVP/:id returns 201 and calls UpdateDinner', function (done) {
    dinnersDb.GetOne({ title: 'A Test Dinner' }, callUpdateOnID);

    function callUpdateOnID(result) {
      request(app)
        .put('/RSVP/' + result._id)
        .send(dinner)
        .expect(201)
        .end(function (err) {
          assert(dinnersDb.UpdateDinner.calledOnce);
          done(err);
        });
    }
  });

  it.skip('RSVP for a dinner adds user to list', function (done) {
    dinnersDb.GetOne({ title: 'A Test Dinner' }, rsvpForDinner);

    function rsvpForDinner(dinnerToUpdate) {
      request(app)
        .put('/RSVP/' + dinnerToUpdate._id)
        .send(dinner)
        .expect(201)
        .end(function (err) {
          dinnersDb.GetOne({ _id: dinnerToUpdate._id }, function (updatedDinner) {
            assert.equal(updatedDinner.rsvp[0], 'BrianG');
            done(err);
          });
        });
    }
  });
});
