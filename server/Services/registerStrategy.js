var registerStrategy = function (LocalStrategy, User) {
  return new LocalStrategy({
    usernameField: 'email'
  }, function (email, password, done) {
    var searchUser = {
      email: email
    }
    User.findOne(searchUser, function (err, user) {
      if (err)
        return done(err);
      if (user) {
        user.isUserExist = true;
        return done(null, user);
      }
      var newUser = new User({
        email: email,
        password: password
      });

      newUser.save(function (err, user) {
        return done(null, user);
      });
    });
  });
}
module.exports = registerStrategy;