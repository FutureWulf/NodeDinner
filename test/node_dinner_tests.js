var assert = require('assert');
var app = require('../app');
var request = require('supertest');
var sinon = require('sinon');
var dinnersDb = require('../db/dinnerRepository');

describe('Node Dinner API', function () {
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

    sinon.spy(dinnersDb, 'FindAllDinners');
    sinon.spy(dinnersDb, 'FindDinnerById');
    sinon.spy(dinnersDb, 'CreateDinner');
    sinon.spy(dinnersDb, 'UpdateDinner');
    sinon.spy(dinnersDb, 'DeleteDinner');

    it('GET /Dinners/ returns status 200 and calls FindAllDinners', function (done) {
      request(app)
        .get('/Dinners')
        .expect(200)
        .end(function () {
          assert(dinnersDb.FindAllDinners.calledOnce);
        });

      done();
    });

    it('GET /Dinners/:id returns 200 and calls FindDinnerById', function (done) {
      request(app)
        .get('/Dinners/10')
        .expect(200)
        .end(function () {
          assert(dinnersDb.FindDinnerById.calledOnce);
        });

      done();
    });

    it('POST /Dinners/ returns 201 and calls CreateDinner', function (done) {
      request(app)
        .post('/Dinners')
        .send(dinner)
        .expect(201)
        .end(function () {
          assert(dinnersDb.CreateDinner.calledOnce);
        });

      done();
    });

    it('PUT /Dinners/:id returns 201 and calls UpdateDinner', function (done) {
      request(app)
        .put('/Dinners/10')
        .send(dinner)
        .expect(201)
        .end(function () {
          assert(dinnersDb.UpdateDinner.calledOnce);
        });

      done();
    });

    it('DELETE /Dinners/:id returns 204 and calls DeleteDinner', function (done) {
      request(app)
        .delete('/Dinners/10')
        .expect(204)
        .end(function () {
          assert(dinnersDb.DeleteDinner.calledOnce);
        });

      done();
    });
  });

  describe('CRUD Operations', function () {
    it.skip('Creating a valid dinner saves the dinner', function (done) {
      request(app)
        .post('/Dinners')
        .send(dinner)
        .end();
      done();
    });
  });
});
