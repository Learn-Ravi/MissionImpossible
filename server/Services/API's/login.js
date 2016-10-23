var User = require(__base + 'Frontend/models/Users');
var common = require(__base + 'server/Services/API\'s/common');
app.post('/login', function (req, res, next) {
  req.user = req.body;
  var searchUser = {
    email: req.user.email
  }
  passport.authenticate('local', function (err, user) {
    if (err) return next(err);

    req.login(user, function (err) {
      if (err) return next(err);

      common.createSendToken(user, res);
    })(req, res, next);
  });
  // User.findOne(searchUser, function (err, user) {
  //   if (err)
  //     throw err;
  //   if (!user) {
  //     return res.status(401).send({
  //       message: 'Wrong email/password'
  //     });
  //   }
  //   user.comparePasswords(req.user.password, function (err, isMatch) {
  //     if (err)
  //       throw err;
  //     if (!isMatch) {
  //       return res.status(401).send({
  //         message: 'Wrong email/password'
  //       });
  //     }
  //     common.createSendToken(user, res);
  //   });
  // });
});