var assert = require('assert');
var app = require('../app');
var request = require('supertest');

describe('Node Dinner API', function () {

  describe('Basic routing', function () {

    it('GET / returns status 200', function (done) {
      request(app)
        .get('/')
        .expect(200, done);
    });
  });
});
