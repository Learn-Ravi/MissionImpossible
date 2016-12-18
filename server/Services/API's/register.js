var register = function (app) {
  var common = require(__base + 'server/Services/API\'s/common');
  var User = require(__base + 'server/Services/models/Users');

  app.post('/register', function (req, res) {
    var user = req.body;
    var newUser = new User({
      email: user.email,
      password: user.password
    })

    newUser.save(function (err) {
      common.createSendToken(newUser, res);
    })
  });
}
module.exports = register;