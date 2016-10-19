var dbConfig = require('./db.js'),
  express = require('express'),
  app = express(),
  hostname = 'localhost',
  port = 3000,
  passport = require('passport'),
  OpenIDStrategy = require('passport-openid').Strategy,
  mongoose = require('mongoose');


mongoose.connect(dbConfig.url);
var passport = require('passport');
var session = require('express-session');
var FirebaseStore = require('connect-firebase')(session);

var firebaseStoreOptions = {
  // Your FireBase database
  host: 'https://missionimpossible-43334.firebaseio.com/',
  // Secret token you can create for your Firebase database
  token: 'vdOHAD0t3MzcXSe8Me373LxSnDgteuyN0i7in7Cc',
  // How often expired sessions should be cleaned up
  reapInterval: 600000,
};
app.use(session({
  store: new FirebaseStore(firebaseStoreOptions),
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true
}));
passport.use(new OpenIDStrategy({
    returnURL: 'http://localhost:3000/auth/openid/return',
    realm: 'http://localhost:3000/'
  },
  function (identifier, done) {
    process.nextTick(function () {
      return done(null, {
        identifier: identifier
      })
    });
  }
));
app.use(passport.initialize());
app.use(passport.session());
//var LocalStrategy = passport.use();

app.use('/', function (req, res, next) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Will add the leader: with details: ');
})
var LocalStrategy = require('passport-local').Strategy;
passport.use('login', new LocalStrategy({
  passReqToCallback: true
}, function (req, username, password, done) {
  if (username === 'admin' && password === 'admin') {
    done(null, 'admin');
  } else {
    done(null, false, req.flash('message', 'User Not found.'));
  }
}));
app.listen(port, hostname, function () {
  console.log("Server running at http://${hostname}:${port}/");
});
