var login = function (app) {
  var User = require(__base + 'server/Services/models/Users');
  var common = require(__base + 'server/Services/API\'s/common');
  app.post('/login',app.passportModule.passport.authenticate('login-Strategy'), function (req, res) {
        common.createSendToken(req.user, res);
  });
}
module.exports = login;
