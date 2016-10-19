var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  hostname = 'localhost',
  port = 3000;

var db = require('../server/db');
var User = require('../Frontend/models/Users');
var jwt = require('jwt-simple');
var app = express();
var secret = 'secret';
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});
app.use("/styles", express.static('C:/Users/ravi/Desktop/Mission Impossible Project/nwjs-sdk-v0.17.0-win-ia32/MI/styles'))
app.use("/dependencies", express.static('C:/Users/ravi/Desktop/Mission Impossible Project/nwjs-sdk-v0.17.0-win-ia32/MI/dependencies'));
app.use("/Frontend", express.static('C:/Users/ravi/Desktop/Mission Impossible Project/nwjs-sdk-v0.17.0-win-ia32/MI/Frontend'));
app.get('/', function (req, res) {
  console.log(req.body);
  res.sendFile('C:/Users/ravi/Desktop/Mission Impossible Project/nwjs-sdk-v0.17.0-win-ia32/MI/index.html');
});

app.get('/login', function (req, res) {
  req.user = req.body;

  User.findOne({
    email: user.email
  }, function (err, user) {
    if (err)
      throw err;
    console.log(user);
  });
});

var jobs = ['1', '2', '3', '4'];
app.get('/jobs', function (req, res) {
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: 'you are not authorized'
    });
  }

  var token = req.headers.authorization.split(' ')[1];
  var payload = jwt.decode(token, secret);

  if (payload.subject) {
    return res.status(401).send({
      message: 'Authentication failed!'
    });
  }

  res.json(jobs);
});

app.post('/register', function (req, res) {
  var user = req.body;
  var newUser = new User.model({
    email: user.email,
    password: user.password
  })

  var payload = {
    issuer: req.hostname,
    subject: newUser.id
  }

  var token = jwt.encode(payload, secret);
  newUser.save(function (err) {
    res.status(200).send({
      user: newUser.toJSON(),
      token: token
    });
  })
});
mongoose.connect(db.url);

var server = app.listen(port, hostname, function () {
  console.log("Server running at http://${hostname}:${port}/");
});