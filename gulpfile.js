var gulp = require('gulp'),
  cssnano = require('gulp-cssnano'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  notify = require('gulp-notify'),
  rename = require('gulp-rename'),
  ngModuleSort = require('gulp-ng-module-sort'),
  sort = require('gulp-angular-filesort'),
  browserify = require('gulp-browserify'),
  concat = require('gulp-concat');

gulp.task('scripts', function () {
  return gulp.src(['C:/Users/ravi/Desktop/Mission Impossible Project/nwjs-sdk-v0.17.0-win-ia32/MI/gulpdependencies/angular.js',
  'C:/Users/ravi/Desktop/Mission Impossible Project/nwjs-sdk-v0.17.0-win-ia32/MI/gulpdependencies/angular-ui-router.js'
    ,'C:/Users/ravi/Desktop/Mission Impossible Project/nwjs-sdk-v0.17.0-win-ia32/MI/gulpdependencies/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(browserify({
      insertGlobals: true,
      debug: true
    }))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('gulp/js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('gulp/js'))
    .pipe(notify({
      message: 'Scripts task complete'
    }));
});

gulp.task('default', [], function () {
  gulp.start('scripts');
});