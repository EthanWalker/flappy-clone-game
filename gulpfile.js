var gulp = require('gulp');

var concat = require('gulp-concat');
var minifyHTML = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');
var glob = require('glob');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var kraken = require('gulp-kraken');


// JavaScript Broweserify task
gulp.task('browserify', function () {
  var files = glob.sync('./game/js/**/*.js');
  return browserify({entries: files}).bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('build/js'));
});

// JavaScript linting task
gulp.task('jshint', function() {
  return gulp.src('game/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Minify index
gulp.task('html', function() {
  return gulp.src('game/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/'));
});

// Styles build task, concatenates all the files
gulp.task('styles', function() {
  return gulp.src('game/css/*.css')
    .pipe(gulp.dest('build/css'));
});

// Image optimization task
gulp.task('images', function() {
  return gulp.src('game/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'));
});

// Watch task
gulp.task('watch', function() {
  gulp.watch('game/js/*.js', ['jshint']);
});

// Default task
gulp.task('default', ['jshint', 'styles', 'watch']);

// Build task
gulp.task('build', ['jshint', 'html', 'styles', 'browserify']);