var config = {
  port: process.env.PORT || 3000,
  db: {
    PROD: 'mongodb://localhost/NodeDinnerDB',
    TEST: 'mongodb://localhost/NodeDinnerDB_Test',
  },
};

module.exports = config;
