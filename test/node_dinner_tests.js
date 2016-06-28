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
    before(function () {
      sinon.spy(dinnersDb, 'FindAllDinners');
      sinon.spy(dinnersDb, 'FindDinnerById');
      sinon.spy(dinnersDb, 'CreateDinner');
      sinon.spy(dinnersDb, 'UpdateDinner');
      sinon.spy(dinnersDb, 'DeleteDinner');
    });

    after(function () {
      dinnersDb.FindAllDinners.restore();
      dinnersDb.FindDinnerById.restore();
      dinnersDb.CreateDinner.restore();
      dinnersDb.UpdateDinner.restore();
      dinnersDb.DeleteDinner.restore();
    });

    it('GET /Dinners/ returns status 200 and calls FindAllDinners', function (done) {
      request(app)
        .get('/Dinners')
        .expect(200)
        .end(function (err) {
          assert(dinnersDb.FindAllDinners.calledOnce);
          done(err);
        });
    });

    it('GET /Dinners/:id returns 200 and calls FindDinnerById', function (done) {
      request(app)
        .get('/Dinners/10')
        .expect(200)
        .end(function (err) {
          assert(dinnersDb.FindDinnerById.calledOnce);
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

    it('PUT /Dinners/:id returns 201 and calls UpdateDinner', function (done) {
      request(app)
        .put('/Dinners/10')
        .send(dinner)
        .expect(201)
        .end(function (err) {
          assert(dinnersDb.UpdateDinner.calledOnce);
          done(err);
        });
    });

    it('DELETE /Dinners/:id returns 204 and calls DeleteDinner', function (done) {
      request(app)
        .delete('/Dinners/10')
        .expect(204)
        .end(function (err) {
          assert(dinnersDb.DeleteDinner.calledOnce);
          done(err);
        });
    });
  });

  describe('CRUD Operations', function () {
    it.skip('Creating a valid dinner saves the dinner', function (done) {
      request(app)
        .post('/Dinners')
        .send(dinner)
        .end(function (res) {
          var id = res._id;
          dinnersDb.FindDinnerById(id, function () {
            assert(1 === 3);
          });
        });

      done();
    });
  });
});
