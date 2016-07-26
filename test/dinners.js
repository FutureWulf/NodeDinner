var assert = require('assert');
var app = require('../app');
var request = require('supertest');
var sinon = require('sinon');
var dinnersDb = require('../db/dinnerRepository');
var mongoose = require('mongoose');
var DinnerSchema = require('../models/dinner');

describe('Dinner Routes and Codes', function () {

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

  before(function (done) {
    sinon.spy(dinnersDb, 'GetAll');
    sinon.spy(dinnersDb, 'GetOne');
    sinon.spy(dinnersDb, 'CreateDinner');
    sinon.spy(dinnersDb, 'UpdateDinner');
    sinon.spy(dinnersDb, 'DeleteDinner');
    done();
  });

  after(function (done) {
    dinnersDb.GetAll.restore();
    dinnersDb.GetOne.restore();
    dinnersDb.CreateDinner.restore();
    dinnersDb.UpdateDinner.restore();
    dinnersDb.DeleteDinner.restore();
    done();
  });

  it('GET /Dinners/ returns status 200 and calls FindAllDinners', function (done) {
    request(app)
      .get('/Dinners')
      .expect(200)
      .end(function (err) {
        assert(dinnersDb.GetAll.calledOnce);
        done(err);
      });
  });

  it('GET /Dinners/:id returns 200 and calls FindDinnerById', function (done) {
    request(app)
      .get('/Dinners/41224d776a326fb40f000001')
      .expect(200)
      .end(function (err) {
        assert(dinnersDb.GetOne.calledOnce);
        done(err);
      });
  });

  it('GET /Dinners/:id with bad ID returns 400', function (done) {
    request(app)
      .get('/Dinners/FourtyTwo')
      .expect(400)
      .end(done);
  });

  it('POST /Dinners/ returns 201 and calls CreateDinner', function (done) {
    request(app)
      .post('/Dinners')
      .send(dinner)
      .expect(201)
      .end(function (err) {
        assert(dinnersDb.CreateDinner.calledOnce);
        done(err);
      });
  });

  it('PUT /Dinners/:id returns 201 and calls UpdateDinner', function (done) {
    dinnersDb.GetOne({ title: 'A Test Dinner' }, callUpdateOnID);

    function callUpdateOnID(result) {
      request(app)
        .put('/Dinners/' + result._id)
        .send(dinner)
        .expect(201)
        .end(function (err) {
          assert(dinnersDb.UpdateDinner.calledOnce);
          done(err);
        });
    }
  });

  it('DELETE /Dinners/:id returns 204 and calls DeleteDinner', function (done) {
    request(app)
      .delete('/Dinners/41224d776a326fb40f000001')
      .expect(204)
      .end(function (err) {
        assert(dinnersDb.DeleteDinner.calledOnce);
        done(err);
      });
  });
});
