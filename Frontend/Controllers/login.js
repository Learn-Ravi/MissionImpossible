MissionImpossible.controller('LoginCtrl', ['$scope', 'alertProviderService', 'AuthToken', 'CONFIG', 'commonAPIService', '$auth',
  function ($scope, AlertProviderService, AuthToken, Config, CommonAPI, $auth) {
    var _this = this;

    _this.warningAlert = function () {
      AlertProviderService.showAlert(Config.ALERT_TYPE_WARNING, 'You are not Authorized!!');
    }

    _this.submit = function () {
      _this.user = {
        email: $scope.email,
        password: $scope.password
      };
      var url = Config.BASE_URL + 'login';
      var promise = $auth.login(_this.user).then(function (result) {
        AlertProviderService.showAlert(Config.ALERT_TYPE_SUCCESS, 'You are now logged in. Welcome, ' + result.data.user.email + '!');
      }).catch(_this.warningAlert);
      //var promise = CommonAPI.commonAPICall(Config.API_TYPE_POST, url, _this.user);
      /*promise.then(function (result) {
        if (result.success) {
          AuthToken.setToken(result.data.token);
          AlertProviderService.showAlert(Config.ALERT_TYPE_SUCCESS, 'You are now logged in. Welcome, ' + _this.user.email + '!');
        } else {
          _this.warningAlert();
        }
      });*/
    }

    _this.authenticate = function (type) {
      $auth.authenticate(type).then(function (res) {
        //AuthToken.setToken(result.data.token);
        AlertProviderService.showAlert(Config.ALERT_TYPE_SUCCESS, 'You are now logged in. Welcome, ' + res.data.user.displayName + '!');
      }, _this.warningAlert);
      /*var promise = AuthToken.googleAuth();
      promise.then(function (result) {
        if (result.success) {
          result.promise.then(function (result) {
            if(result.success) {
              AuthToken.setToken(result.data.token);
              AlertProviderService.showAlert(Config.ALERT_TYPE_SUCCESS, 'You are now logged in. Welcome, ' + result.data.user.displayName + '!');
            } else {
              _this.warningAlert();
            }
          });          
        } else {
          _this.warningAlert();
        }
      });*/
    }
  }
]);