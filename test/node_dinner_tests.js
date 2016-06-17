var assert = require('assert');
var app = require('../app');
var request = require('supertest');

describe('Node Dinner API', function () {

  describe('Basic routing', function () {

    before(function (done) {
      done();
    });

    it('GET / returns status 200', function (done) {
      request(app)
        .get('/')
        .expect(200, done);
    });

    it('GET /Dinners returns status 200', function (done) {
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

    it('POST /Dinners/ returns JSON message with id', function (done) {

      var dinner = { title: 'Test Dinner' };

      request(app)
        .post('/Dinners')
        .send(dinner)
        .expect(200)
        .expect('Test Dinner is saved', done);
    });
  });
});
