var jobs = function (app) {
  var jobs = ['1', '2', '3', '4'];
  app.get('/jobs', function (req, res) {
    if (!req.headers.authorization) {
      return res.status(401).send({
        message: 'you are not authorized'
      });
    }

    var token = req.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, secret);

    if (!payload.subject) {
      return res.status(401).send({
        message: 'Authentication failed!'
      });
    }
    res.json(jobs);
  });
}
module.exports = jobs