var facebookAuth = function (app) {
  var request = require('request'),
    common = require(__base + 'Services/API\'s/common'),
    User = require(__base + 'Services/models/Users'),
    qs = require('querystring');

  app.post('/auth/facebook', function (req, res) {
    var params = {
      client_id: req.body.clientId,
      code: req.body.code,
      redirect_uri: req.body.redirectUri,
      client_secret: 'cf403f87571427e55f26c27db67f0eee'
    }
    request.get({
      url: global.constants.FACEBOOK_AUTH_TOKEN_ENDPOINT,
      qs: params,
      json: true
    }, function (err, response, token) {
      var accessToken = token.access_token;
      var headers = {
        Authorization: 'Bearer ' + accessToken
      }
      request.get({
        url: global.constants.FACEBOOK_GRAPH_API_ENDPOINT,
        qs: {access_token: accessToken},
        json: true
      }, function (err, response, profile) {
        User.findOne({
          facebookId: profile.id
        }, function (err, user) {
          if (user) {
            return common.createSendToken(user, res);
          }
          var newUser = new User();
          newUser.facebookId = profile.id;
          newUser.displayName = profile.name;
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
module.exports = facebookAuth;