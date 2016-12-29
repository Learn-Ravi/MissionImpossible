var express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path');
var app = express();
var passportModule = require(__base + 'Services/passport');
passportModule.initializePassport(app);
app.passportModule = passportModule;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next();
});
app.use("/styles", express.static(path.resolve(__base + '..//' + 'styles')))
app.use("/dependencies", express.static(path.resolve(__base + '..//' + 'dependencies')));
app.use("/Frontend", express.static(path.resolve(__base + '..//' + 'Frontend')));
require(__base + 'Services/API\'s').loadAllAPI(app);


module.exports = app;