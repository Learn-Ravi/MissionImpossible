var express = require('express'),
  passport = require('passport'),
  util = require('util'),
  OpenIDStrategy = require('passport-openid').Strategy;

var hostname = 'localhost';
var port = 3000;

passport.serializeUser(function (user, done) {
  done(null, user.identifier);
});

passport.deserializeUser(function (identifier, done) {
  done(null, {
    identifier: identifier
  });
});

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

var app = express();

//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');
//app.use(express.logger());
//app.use(express.cookieParser());
//app.use(express.bodyParser());
//app.use(express.methodOverride());
app.use(express.session({
  secret: 'keyboard cat'
}));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
//app.use(express.static(__dirname + '/../../public'));



app.get('/', function (req, res) {
  res.render('index', {
    user: req.user
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}
app.get('/account', ensureAuthenticated, function (req, res) {
  res.render('account', {
    user: req.user
  });
});

app.get('/login', function (req, res) {
  res.render('login', {
    user: req.user
  });
});

app.post('/auth/openid',
  passport.authenticate('openid', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/');
  });

app.get('/auth/openid/return',
  passport.authenticate('openid', {
    failureRedirect: '/login'
  }),
  function (req, res) {
    res.redirect('/');
  });

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.listen(port, hostname, function () {
  console.log("Server running at http://${hostname}:${port}/");
});
