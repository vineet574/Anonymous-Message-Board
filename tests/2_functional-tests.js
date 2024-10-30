const chaiHttp = require('chai-http');
const chai = require('chai');
const server = require('../server');
const assert = chai.assert;

chai.use(chaiHttp);

suite('Functional Tests', function () {
  suite('/api/threads/{board}', function () {
    test('Creating a new thread: POST request to /api/threads/{board}', function (done) {
      chai.request(server)
        .post('/api/threads/testboard')
        .send({ text: 'Test thread', delete_password: 'password' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });

    test('Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}', function (done) {
      chai.request(server)
        .get('/api/threads/testboard')
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          done();
        });
    });

    test('Deleting a thread with the incorrect password: DELETE request to /api/threads/{board}', function (done) {
      chai.request(server)
        .delete('/api/threads/testboard')
        .send({ thread_id: 'invalid_id', delete_password: 'wrong_password' })
        .end((err, res) => {
          assert.equal(res.status, 400);
          done();
        });
    });

    test('Deleting a thread with the correct password: DELETE request to /api/threads/{board}', function (done) {
      chai.request(server)
        .delete('/api/threads/testboard')
        .send({ thread_id: 'valid_id', delete_password: 'correct_password' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });

    test('Reporting a thread: PUT request to /api/threads/{board}', function (done) {
      chai.request(server)
        .put('/api/threads/testboard')
        .send({ thread_id: 'some_id' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });
  });

  suite('/api/replies/{board}', function () {
    test('Creating a new reply: POST request to /api/replies/{board}', function (done) {
      chai.request(server)
        .post('/api/replies/testboard')
        .send({ thread_id: 'some_id', text: 'Test reply', delete_password: 'password' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });

    test('Viewing a single thread with all replies: GET request to /api/replies/{board}', function (done) {
      chai.request(server)
        .get('/api/replies/testboard?thread_id=some_id')
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });

    test('Deleting a reply with the incorrect password: DELETE request to /api/replies/{board}', function (done) {
      chai.request(server)
        .delete('/api/replies/testboard')
        .send({ reply_id: 'reply_id', delete_password: 'wrong_password' })
        .end((err, res) => {
          assert.equal(res.status, 400);
          done();
        });
    });

    test('Deleting a reply with the correct password: DELETE request to /api/replies/{board}', function (done) {
      chai.request(server)
        .delete('/api/replies/testboard')
        .send({ reply_id: 'reply_id', delete_password: 'correct_password' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });

    test('Reporting a reply: PUT request to /api/replies/{board}', function (done) {
      chai.request(server)
        .put('/api/replies/testboard')
        .send({ reply_id: 'reply_id' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          done();
        });
    });
  });
});
