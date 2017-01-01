MissionImpossible.controller('LogoutCtrl',['$auth','$state', function ($auth, $state) {
		$auth.removeToken();

    $state.go('login');
	}]);