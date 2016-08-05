var assert = require('assert');
var app = require('../../app');
var request = require('supertest');
var sinon = require('sinon');
var userDb = require('../../db/userRepository');
var mongoose = require('mongoose');
var UserSchema = require('../../models/user');

describe('User Controller', function () {

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

  var user = {
    username: 'BrianG_Test',
    password: 'password1',
  };

  before(function (done) {
    sinon.spy(userDb, 'GetAll');
    sinon.spy(userDb, 'GetOne');
    sinon.spy(userDb, 'CreateUser');
    sinon.spy(userDb, 'UpdateUser');
    sinon.spy(userDb, 'DeleteUser');
    done();
  });

  after(function (done) {
    userDb.GetAll.restore();
    userDb.GetOne.restore();
    userDb.CreateUser.restore();
    userDb.UpdateUser.restore();
    userDb.DeleteUser.restore();
    done();
  });

  it('GET /User/ returns status 200 and calls GetAll', function (done) {
    request(app)
      .get('/User')
      .expect(200)
      .end(function (err) {
        assert(userDb.GetAll.calledOnce);
        done(err);
      });
  });

  it('GET /User/:id returns 200 and calls GetOne', function (done) {
    request(app)
      .get('/User/41224d776a326fb40f000001')
      .expect(200)
      .end(function (err) {
        assert(userDb.GetOne.calledOnce);
        done(err);
      });
  });

  it('GET /User/:id with bad ID returns 400', function (done) {
    request(app)
      .get('/User/FourtyTwo')
      .expect(400)
      .end(done);
  });

  it('POST /User/ returns 201 and calls CreateUser', function (done) {
    request(app)
      .post('/User')
      .send(user)
      .expect(201)
      .end(function (err) {
        assert(userDb.CreateUser.calledOnce);
        done(err);
      });
  });

  it('PUT /User/:id returns 201 and calls UpdateUser', function (done) {
    userDb.GetOne({ title: 'A Test Dinner' }, callUpdateOnID);

    function callUpdateOnID(result) {
      request(app)
        .put('/User/' + result._id)
        .send(user)
        .expect(201)
        .end(function (err) {
          assert(userDb.UpdateUser.calledOnce);
          done(err);
        });
    }
  });

  it('DELETE /Dinners/:id returns 204 and calls DeleteUser', function (done) {
    request(app)
      .delete('/User/41224d776a326fb40f000001')
      .expect(204)
      .end(function (err) {
        assert(userDb.DeleteUser.calledOnce);
        done(err);
      });
  });
});
