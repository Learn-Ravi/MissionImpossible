MissionImpossible.controller('LogoutCtrl',['AuthToken','$state', function (AuthToken, $state) {
		AuthToken.removeToken();

    $state.go('login');
	}]);