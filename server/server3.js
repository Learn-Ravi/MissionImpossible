global.__base = __dirname + '/';
var hostname = 'localhost',
  port = 3000,
  db = require(__base + 'db'),
  app = require(__base + 'Services/express'),
  path = require('path');

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__base + '..//' + 'index.html'));
});

global.secret = 'secret';

var server = app.listen(port, hostname, function () {
  console.log("Server running at http://${hostname}:${port}/");
});