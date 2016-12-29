var register = function (app) {
  var common = require(__base + 'Services/API\'s/common');
  var User = require(__base + 'Services/models/Users');

  app.post('/register', app.passportModule.passport.authenticate('register-Strategy'), function (req, res) {
    if (req.user.isUserExist) {
      res.status(409).send({
        message:'User already exist. Please choose a different EmailId.'
      });
    } else {
      common.createSendToken(req.user, res);
    }    
  });
} 
module.exports = register;