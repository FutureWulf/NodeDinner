var assert = require('assert');
var app = require('../app');
var request = require('supertest');
var sinon = require('sinon');
var dinnerDb = require('../db/dinnerRepository');

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

  describe('Routing', function () {
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

    it('GET /Dinners/ returns status 200 with JSON object', function (done) {
      request(app)
        .get('/Dinners')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done);
    });

    it('GET /Dinners/:id returns 200 with correct dinner', function (done) {
      request(app)
        .get('/Dinners/5745c51a9a1a11a90678e800')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect(function (res) {
          res.body.title = 'Silly Dinner';
        })
        .end(done);
    });

    it('POST /Dinners/ returns 201 with id of saved object', function (done) {
      request(app)
        .post('/Dinners')
        .send(dinner)
        .expect(201)
        .expect(dinner.title + ' is saved')
        .end(done);
    });

    it('PUT /Dinners/:id returns 201 with updated message', function (done) {
      request(app)
        .put('/Dinners/10')
        .send(dinner)
        .expect(201)
        .expect(dinner.title + ' is updated')
        .end(done);
    });

    it('DELETE /Dinners/:id returns 204', function (done) {
      request(app)
        .delete('/Dinners/10')
        .expect(204)
        .end(done);
    });
  });

  describe('Dinner methods use repository', function () {
    sinon.spy(dinnerDb, 'FindAllDinners');
    sinon.spy(dinnerDb, 'FindDinnerById');
    sinon.spy(dinnerDb, 'CreateDinner');
    sinon.spy(dinnerDb, 'UpdateDinner');
    sinon.spy(dinnerDb, 'DeleteDinner');

    it('GET /Dinners/ calls FindAllDinners', function (done) {
      request(app)
        .get('/Dinners')
        .end();
      assert(dinnerDb.FindAllDinners.calledOnce);
      done();
    });

    it('GET /Dinners/:id calls FindDinnerById with ID', function (done) {
      request(app)
        .get('/Dinners/10')
        .end();
      assert(dinnerDb.FindDinnerById.calledOnce);
      done();
    });

    it('POST /Dinners/ calls CreateDinner', function (done) {
      request(app)
        .post('/Dinners')
        .send(dinner)
        .end();
      assert(dinnerDb.CreateDinner.calledOnce);
      done();
    });

    it('PUT /Dinners/:id calls UpdateDinner', function (done) {
      request(app)
        .put('/Dinners/10')
        .send(dinner)
        .end();
      assert(dinnerDb.UpdateDinner.calledOnce);
      done();
    });

    it('DELETE /Dinners/:id calls DeleteDinner', function (done) {
      request(app)
        .delete('Dinners/10')
        .end();
      assert(dinnerDb.DeleteDinner.calledOnce);
      done();
    });
  });

  describe('CRUD Functionality', function () {
    it.skip('Creating a valid dinner saves the dinner', function (done) {
      request(app)
        .post('/Dinners')
        .send(dinner)
        .end();
      done();
    });
  });
});
