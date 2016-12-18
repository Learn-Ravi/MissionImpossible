var login = function (app) {
  var User = require(__base + 'server/Services/models/Users');
  var common = require(__base + 'server/Services/API\'s/common');
  app.post('/login', function (req, res, next) {
    req.user = req.body;
    var searchUser = {
      email: req.user.email
    }
    app.passportModule.passport.authenticate('local', function (err, user) {
      if (err) return next(err);

      req.login(user, function (err) {
        if (err) return next(err);

        common.createSendToken(user, res);
      });
    })(req, res, next);
  });
}
module.exports = login;
