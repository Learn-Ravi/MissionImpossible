MissionImpossible.controller('HeaderCtrl', ['$scope', '$auth', function ($scope, $auth) {
  $scope.isAuthenticated = $auth.isAuthenticated;
}]);