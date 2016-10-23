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
app.use("/styles", express.static('C:/Users/ravi/Desktop/Mission Impossible Project/nwjs-sdk-v0.17.0-win-ia32/MI/styles'))
app.use("/dependencies", express.static('C:/Users/ravi/Desktop/Mission Impossible Project/nwjs-sdk-v0.17.0-win-ia32/MI/dependencies'));
app.use("/Frontend", express.static('C:/Users/ravi/Desktop/Mission Impossible Project/nwjs-sdk-v0.17.0-win-ia32/MI/Frontend'));
global.app = app;
module.exports = app;