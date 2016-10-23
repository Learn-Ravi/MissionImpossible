var common = {};

common.createSendToken = function (user, res) {
  var payload = {
    subject: user.id
  }

  var token = jwt.encode(payload, secret);

  res.status(200).send({
    user: user.toJSON(),
    token: token
  });
}

module.exports = common;