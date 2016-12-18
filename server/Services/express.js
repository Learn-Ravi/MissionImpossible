var express = require('express'),
  bodyParser = require('body-parser');
var app = express();
var passportModule = require(__base + 'server/Services/passport');
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
app.use("/styles", express.static(__base + 'styles'))
app.use("/dependencies", express.static(__base + 'dependencies'));
app.use("/Frontend", express.static(__base + 'Frontend'));
require(__base + 'server/Services/API\'s').loadAllAPI(app);


module.exports = app;