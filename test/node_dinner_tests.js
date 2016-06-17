var assert = require('assert');
var app = require('../app');
var request = require('supertest');
var sinon = require('sinon');
var db = require('../db/repository');

describe('Node Dinner API', function () {
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

    var dinner = { title: 'Test Dinner' };

    before(function (done) {
      done();
    });

    it('GET /Dinners/ returns status 200', function (done) {
      request(app)
        .get('/Dinners')
        .expect(200, done);
    });

    it('GET /Dinners/:id returns JSON message with id', function (done) {
      request(app)
        .get('/Dinners/10')
        .expect('Content-Type', /json/)
        .expect(200, { id: 10, message: 'Hello' }, done);
    });

    it('POST /Dinners/ returns saved message', function (done) {
      request(app)
        .post('/Dinners')
        .send(dinner)
        .expect(200)
        .expect('Test Dinner is saved', done);
    });

    it('PUT /Dinners/:id returns updated message', function (done) {
      request(app)
        .put('/Dinners/10')
        .send(dinner)
        .expect(200)
        .expect('Test Dinner is updated', done);
    });

    it('DELETE /Dinners/:id returns deleted message', function (done) {
      request(app)
        .delete('/Dinners/10')
        .expect(200)
        .expect('Dinner id: 10 was deleted', done);
    });
  });

  describe('Dinner repository', function () {

    sinon.spy(db, 'FindAll');

    it('GET /Dinners/ calls FindAll on repository', function (done) {
      request(app)
        .get('/Dinners')
        .expect(200);
      assert(db.FindAll.called);
      done();
    });
  });
});
