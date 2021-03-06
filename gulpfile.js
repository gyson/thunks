'use strict';

var gulp = require('gulp'),
  runSequence = require('run-sequence'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  mocha = require('gulp-mocha');

gulp.task('jshint', function () {
  return gulp.src(['thunks.js', 'gulpfile.js', 'examples/*.js', 'test/*.js', 'benchmark/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('mocha', function () {
  return gulp.src('test/*.js', {read: false})
    .pipe(mocha());
});

gulp.task('uglify', function() {
  return gulp.src('thunks.js')
    .pipe(uglify())
    .pipe(rename('thunks.min.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', function (callback) {
  runSequence('jshint', 'mocha', 'uglify', callback);
});

gulp.task('test', function (callback) {
  runSequence('jshint', 'mocha', callback);
});
