global.__base = 'C:/Users/ravi/Desktop/Mission Impossible Project/nwjs-sdk-v0.17.0-win-ia32/MI/';
var hostname = 'localhost',
  port = 3000,
  db = require(__base + 'server/db'),
  jwt = require('jwt-simple'),
  app = require(__base + 'server/Services/express');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

var Strategy = new LocalStrategy(function (email, password, done) {
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
      return done(null, user)
    });
  });
});
passport.use(Strategy);
var loadAllAPI = require(__base + 'server/Services/API\'s')

app.get('/', function (req, res) {
  res.sendFile(__base + 'index.html');
});

global.jwt = jwt;
global.secret = 'secret';
global.passport = passport;

var server = app.listen(port, hostname, function () {
  console.log("Server running at http://${hostname}:${port}/");
});