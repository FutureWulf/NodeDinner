var assert = require('assert');
var app = require('../app');
var request = require('supertest');
var sinon = require('sinon');
var dinnersDb = require('../db/dinnerRepository');
var mongoose = require('mongoose');
var DinnerSchema = require('../models/dinner');

describe('Node Dinner API', function () {

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

  describe('Basic Routing', function () {
    it('GET / returns status 200', function (done) {
      request(app)
        .get('/')
        .expect(200, done);
    });

    it('GET /About/ returns status 200', function (done) {
      request(app)
        .get('/About')
        .expect(200, done);
    });

    it('GET /Contact/ returns status 200', function (done) {
      request(app)
        .get('/Contact')
        .expect(200, done);
    });
  });

  describe('Dinners Routing', function () {
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

    it.skip('PUT /Dinners/:id returns 201 and calls UpdateDinner', function (done) {
      request(app)
        .put('/Dinners/41224d776a326fb40f000001')
        .send(dinner)
        .expect(201)
        .end(function (err) {
          assert(dinnersDb.UpdateDinner.calledOnce);
          done(err);
        });
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

  describe('Creating, Updating and Deleting', function () {
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
      dinnersDb.GetOne({ title: 'A Test Dinner' }, function (result) {
        var dinner = result;
        var id = dinner._id;
        dinner.title = 'A Silly Dinner';

        request(app)
          .put('/Dinners/' + id)
          .send(dinner)
          .expect(201)
          .end(function (error, response) {
            if (error) throw error;
            dinnersDb.GetOne({ _id: response.body._id }, function (result) {
              assert.equal(result.title, 'A Silly Dinner');
              done();
            });
          });
      });
    });
  });
});
