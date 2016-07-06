var assert = require('assert');
var app = require('../app');
var request = require('supertest');

describe('Basic Routes and Codes', function () {
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

  it('GET bad path returns 404', function (done) {
    request(app)
      .get('/Nothing')
      .expect(404, done);
  });
});
