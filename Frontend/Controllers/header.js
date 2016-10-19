MissionImpossible.controller('HeaderCtrl', ['$scope', 'AuthToken', function ($scope, AuthToken) {
  $scope.isAuthenticated = AuthToken.isAuthenticated;
}]);