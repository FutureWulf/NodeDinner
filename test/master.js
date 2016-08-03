describe('Routes and Response Codes', function () {
  require('./routes/basic');
  require('./routes/dinners');
  require('./routes/rsvp');
});

describe('Repository Functionality', function () {
  require('./repositories/dinners');
  require('./repositories/user');
});
