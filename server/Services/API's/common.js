var common = {},
  jwt = require('jwt-simple'),
  moment = require('moment');
common.createSendToken = function (user, res) {
  var payload = {
    subject: user.id,
    exp: moment().add(10,'days').unix()
  }

  var token = jwt.encode(payload, secret);

  res.status(200).send({
    user: user.toJSON(),
    token: token
  });
}

module.exports = common;