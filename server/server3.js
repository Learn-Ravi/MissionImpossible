global.__base = 'C:/Users/ravi/Desktop/Mission Impossible Project/nwjs-sdk-v0.17.0-win-ia32/MI/';
var hostname = 'localhost',
  port = 3000,
  db = require(__base + 'server/db'),
  jwt = require('jwt-simple'),
  app = require(__base + 'server/Services/express');

var loadAllAPI = require(__base + 'server/Services/API\'s')

app.get('/', function (req, res) {
  res.sendFile(__base + 'index.html');
});

global.jwt = jwt;
global.secret = 'secret';

var server = app.listen(port, hostname, function () {
  console.log("Server running at http://${hostname}:${port}/");
});