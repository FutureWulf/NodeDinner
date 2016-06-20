var assert = require('assert');
var app = require('../app');
var request = require('supertest');
var sinon = require('sinon');
var dinnerDb = require('../db/dinnerRepository');

describe('Node Dinner API', function () {

  var dinner = { title: 'Test Dinner' };

  describe('Home routing', function () {

    before(function (done) {
      done();
    });

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

  describe('Dinners routing', function () {

    before(function (done) {
      done();
    });

    it('GET /Dinners/ returns status 200 with JSON object', function (done) {
      request(app)
        .get('/Dinners')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('GET /Dinners/:id returns 200 with JSON message with id', function (done) {
      request(app)
        .get('/Dinners/10')
        .expect('Content-Type', /json/)
        .expect(200, { id: 10, message: 'Hello' }, done);
    });

    it('POST /Dinners/ returns 200 with saved message', function (done) {
      request(app)
        .post('/Dinners')
        .send(dinner)
        .expect(200)
        .expect('Test Dinner is saved', done);
    });

    it('PUT /Dinners/:id returns 200 with updated message', function (done) {
      request(app)
        .put('/Dinners/10')
        .send(dinner)
        .expect(200)
        .expect('Test Dinner is updated', done);
    });

    it('DELETE /Dinners/:id returns 200 with deleted message', function (done) {
      request(app)
        .delete('/Dinners/10')
        .expect(200)
        .expect('Dinner id: 10 was deleted', done);
    });
  });

  describe('Dinner methods use repository', function () {

    sinon.spy(dinnerDb, 'FindAllDinners');
    sinon.spy(dinnerDb, 'FindDinnerById');
    sinon.spy(dinnerDb, 'CreateDinner');
    sinon.spy(dinnerDb, 'UpdateDinner');
    sinon.spy(dinnerDb, 'DeleteDinner');

    it('GET /Dinners/ calls FindAllDinners on repository', function (done) {
      request(app)
        .get('/Dinners');
      assert(dinnerDb.FindAllDinners.called);
      done();
    });

    it('GET /Dinners/:id calls FindDinnerById on repository', function (done) {
      request(app)
        .get('/Dinners/10');
      assert(dinnerDb.FindDinnerById.called);
      done();
    });

    it('POST /Dinners/ calls CreateDinner on repository', function (done) {
      request(app)
        .post('/Dinners')
        .send(dinner);
      assert(dinnerDb.CreateDinner.called);
      done();
    });

    it('PUT /Dinners/:id calls UpdateDinner on repository', function (done) {
      request(app)
        .put('/Dinners/10')
        .send(dinner);
      assert(dinnerDb.UpdateDinner.called);
      done();
    });

    it('DELETE /Dinners/:id calls DeleteDinner on repository', function (done) {
      request(app)
        .delete('Dinners/10');
      assert(dinnerDb.DeleteDinner.called);
      done();
    });
  });
});
