var googleAuth = function (app) {
  var request = require('request'),
    common = require(__base + 'Services/API\'s/common'),
    User = require(__base + 'Services/models/Users');

  app.post('/auth/google', function (req, res) {
    var params = {
      client_id: req.body.clientId,
      code: req.body.code,
      redirect_uri: req.body.redirectUri,
      client_secret: 'J_fyluDXH-fKwoIVYpU8K5j3',
      grant_type: 'authorization_code'
    }
    request.post(global.constants.GOOGLE_AUTH_TOKEN_ENDPOINT, {
      json: true,
      form: params
    }, function (err, response, token) {
      var accessToken = token.access_token;
      var headers = {
        Authorization: 'Bearer ' + accessToken
      }
      request.get({
        url: global.constants.GOOGLE_API_PROFILE_ENDPOINT,
        headers: headers,
        json: true
      }, function (err, response, profile) {
        User.findOne({
          googleId: profile.emails[0].value
        }, function (err, user) {
          if (user) {
            return common.createSendToken(user, res);
          }
          var newUser = new User();
          newUser.googleId = profile.emails[0].value;
          newUser.displayName = profile.displayName;
          newUser.save(function (err) {
            if (err) {
              next(err);
            }
            return common.createSendToken(newUser, res);
          })
        })
      })
    });
  });
}
module.exports = googleAuth;