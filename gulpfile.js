var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');

var paths = {
  sourcefiles : [
  './src/tag-sorted.js',
  './src/tag-th']
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
    .pipe(gulp.dest('./release/'))
    .pipe(gulp.dest('./examples/'))
});

gulp.task('watch', function(){
  gulp.watch(paths.sourcefiles, ['release']);
});


gulp.task('default', ['release', 'watch', 'webserver']);
