var login = function (app) {
  var User = require(__base + 'Services/models/Users');
  var common = require(__base + 'Services/API\'s/common');
  app.post('/login',app.passportModule.passport.authenticate('login-Strategy'), function (req, res) {
        common.createSendToken(req.user, res);
  });
}
module.exports = login;
