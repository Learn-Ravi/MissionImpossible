var gulp = require('gulp'),
  cssnano = require('gulp-cssnano'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  notify = require('gulp-notify'),
  rename = require('gulp-rename'),
  ngModuleSort = require('gulp-ng-module-sort'),
  sort = require('gulp-angular-filesort'),
  browserify = require('gulp-browserify'),
  order = require('gulp-order'),
  concat = require('gulp-concat');

gulp.task('scripts', function () {
  return gulp.src(['./gulpdependencies/angular.js',
      './gulpdependencies/angular-ui-router.js',
      './gulpdependencies/*.js'
    ])
    .pipe(jshint('.jshintrc'))
    //.pipe(sort())
    .pipe(jshint.reporter('default'))
    .pipe(order(['gulpdependencies/_angular.js',
      'gulpdependencies/ui-bootstrap.js',
      'gulpdependencies/ui-bootstrap-tpls.js',
      'gulpdependencies/angular-ui-router.js',
      'gulpdependencies/angular-animate.js',
      'gulpdependencies/alertProvider.js',
      'gulpdependencies/satellizer.js'
    ], {
      base: './'
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('gulp/js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('gulp/js'))
    .pipe(notify({
      message: 'Scripts task complete'
    }));
});

gulp.task('default', [], function () {
  gulp.start('scripts');
});