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
  concat = require('gulp-concat'),
  deployer = require('nexus-deployer'),
  Zip = require('node-7z');

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
    .pipe(gulp.dest('dependencies'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('dependencies'))
    .pipe(notify({
      message: 'Scripts task complete'
    }));
});

gulp.task('artifacts:generate', function(callback) {
  var archive = new Zip();
  console.log('started archive');
  archive.add('C:/artifacts/nexus-deployer.7z', ['*.*','*'], {
  }).progress(function (files) {
    console.log('Some files are extracted: %s', files);
  }).then(function () {
    console.log('artifacts created.')
    callback();
  });
  callback();
});

gulp.task('deploy:artifacts', ['artifacts:generate'], function(callback) {
  
    var snapshot = {
        groupId: 'nexus-deployer',
        artifactId: 'nexus-deployer',
        version: '1.3-SNAPSHOT',
        packaging: 'zip',
        auth: {
            username:'admin',
            password:'admin123'
        },
        pomDir: 'C:/build/pom',
        url: 'http://localhost:8081/nexus/content/repositories/snapshots',
        artifact: 'C:/artifacts/nexus-deployer.7z',
        noproxy: 'localhost',
        cwd: '',
        quiet: false,
        insecure: true
    };
 
    deployer.deploy(snapshot, callback);
    console.log('artifacts deployed');
});

gulp.task('default', [], function () {
  //gulp.start('scripts');
  gulp.start('deploy:artifacts');
});
