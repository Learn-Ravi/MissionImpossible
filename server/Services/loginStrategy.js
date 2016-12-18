var loginStrategy = function (LocalStrategy, User) {
  return new LocalStrategy({
    usernameField: 'email'
  }, function (email, password, done) {
    var searchUser = {
      'email': email
    }
    User.findOne(searchUser, function (err, user) {
      if (err)
        return done(err);
      if (!user) {
        return done(null, false, {
          message: 'Wrong email/password'
        });
      }
      user.comparePasswords(password, function (err, isMatch) {
        if (err)
          return done(err);
        if (!isMatch) {
          return done(null, false, {
            message: 'Wrong email/password'
          });
        }
        return done(null, user);
      });
    });
  });
}
module.exports = loginStrategy;