var passportModule = {};

passportModule.initializePassport = function (app) {
  this.passport = require('passport');
  var User = require(__base + 'server/Services/models/Users');
  var LocalStrategy = require('passport-local').Strategy;
  app.use(this.passport.initialize());
  var loginStrategy = require(__base + 'server/Services/loginStrategy')(LocalStrategy,User);
  var registerStrategy = require(__base + 'server/Services/registerStrategy')(LocalStrategy,User);
  this.passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  this.passport.deserializeUser(function (user, done) {
    done(null, user.id);
  });

  this.passport.use('login-Strategy',loginStrategy);
  this.passport.use('register-Strategy',registerStrategy);
}
module.exports = passportModule;