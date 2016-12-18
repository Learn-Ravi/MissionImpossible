var passportModule = {};

passportModule.initializePassport = function (app) {
  this.passport = require('passport');
  var User = require(__base + 'server/Services/models/Users');
  var LocalStrategy = require('passport-local').Strategy;

  app.use(this.passport.initialize());
  this.passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  this.passport.deserializeUser(function (user, done) {
    done(null, user.id);
  });

  var Strategy = new LocalStrategy({
    usernameField: 'email'
  }, function (email, password, done) {
    var searchUser = {
      'email': email
    }
    User.findOne(searchUser, function (err, user) {
      if (err)
        return done(err);
      if (!user) {
        return done(null, false, {
          message: 'Wrong email/password'
        });
      }
      user.comparePasswords(password, function (err, isMatch) {
        if (err)
          return done(err);
        if (!isMatch) {
          return done(null, false, {
            message: 'Wrong email/password'
          });
        }
        return done(null, user);
      });
    });
  });
  this.passport.use(Strategy);
}
module.exports = passportModule;