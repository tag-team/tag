var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var wrap = require("gulp-wrap");
var karma = require('karma').server;
var eslint = require('gulp-eslint');

var paths = {
  sourcefiles : [
    './src/tag-source.js',
    './src/tag-component.js'
  ]
};

gulp.task('webserver', function() {
  gulp.src('examples')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('release', function() {
  gulp.src(paths.sourcefiles)
      .pipe(concat('tag.js'))
      .pipe(wrap('(function(){\n"use strict";\n<%= contents %>\n})();\n'))
      .pipe(gulp.dest('./release/'))
      .pipe(gulp.dest('./examples/'));
});

/**
* Runs our unit tests with karma
* */
gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    autoWatch: false
  }, done);
});

/**
 * Watch for file changes and re-run tests on each change
 * */
gulp.task('tdd', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    autoWatch: true
  }, done);
});

/**
 * ESLINT
 */
gulp.task('lint', function () {
  gulp.src(paths.sourcefiles)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', function(){
  gulp.watch(paths.sourcefiles, ['lint', 'release']);
});


gulp.task('default', ['release', 'watch', 'webserver', 'tdd']);
