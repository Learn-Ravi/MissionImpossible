'use strict';
MissionImpossible.controller('RegisterCtrl', ['$scope', 'alertProviderService', 'AuthToken', 'CONFIG','commonAPIService',
  function ($scope, AlertProviderService, AuthToken, Config, CommonAPI) {
    var _this = this;
    _this.submit = function () {
      _this.user = {
        email: $scope.email,
        password: $scope.password
      };
      var url = Config.BASE_URL+'register';
      var promise = CommonAPI.commonAPICall(Config.API_TYPE_POST, url, _this.user);
      promise.then(function (result) {
        if (result.success) {
          AuthToken.setToken(result.data.token);
          AlertProviderService.showAlert(Config.ALERT_TYPE_SUCCESS, 'You are now registered. Welcome, ' + _this.user.email + '!');
        } else {
          if (result.status === 409) {
            AlertProviderService.showAlert(Config.ALERT_TYPE_WARNING, result.error.message);
          } else {
            AlertProviderService.showAlert(Config.ALERT_TYPE_WARNING, 'Could not register!!');
          }          
        }
      });
    };
  }
]);