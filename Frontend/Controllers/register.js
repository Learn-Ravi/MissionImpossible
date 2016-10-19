'use strict';

MissionImpossible.controller('RegisterCtrl', ['$scope', '$http', '$alertProvider', '$auth', 'AuthToken', function ($scope, $http, alertProvider, $auth, AuthToken) {
  var _this = this;
  _this.submit = function () {
    _this.user = {
      email: $scope.email,
      password: $scope.password
    };
    var url = 'http://localhost:3000/register';

    $http.post(url, _this.user).success(function (res) {
      AuthToken.setToken(res.token);
      alertProvider.open({
        title: 'Success',
        body: 'You are now registered. Welcome, '+ _this.user.email + '!',
        buttons: [{
          label: 'OK!',
          cssClass: 'btn btn-primary',
          action: function () {
            console.log('success')
          }
        }]
      });
    }).error(function (err) {
      alertProvider.open('warning', 'Opps', 'COuld not register');
    });
    /*$auth.signup({
        email: $scope.email,
        password: $scope.password
      })
      .then(function (res) {
        alert('success', 'Account Created!', 'Welcome, ' + res.data.user.email + '! Please email activate your account in the next several days.');
      })
      .catch(function (err) {
        alert('warning', 'Unable to create account :(', err.message);
      });*/
  };
}]);
