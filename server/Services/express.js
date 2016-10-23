var express = require('express'),
  bodyParser = require('body-parser');
var app = express();
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
global.app = app;
module.exports = app;