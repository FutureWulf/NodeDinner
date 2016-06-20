var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var config = require('./config/config');

gulp.task('default', function () {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: config.port,
    },
    ignore: ['./node_modules/**'],
  })
  .on('restart', function () {
    console.log('Restarting');
  });
});
