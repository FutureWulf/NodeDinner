var config = {
  port: process.env.PORT || 3000,
  env: 'TEST',
  db: {
    PROD: 'mongodb://localhost/NodeDinnerDB',
    TEST: 'mongodb://localhost/NodeDinnerDB_Test',
  },
};

module.exports = config;
