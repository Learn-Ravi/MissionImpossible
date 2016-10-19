MissionImpossible.controller('JobsCtrl',['AuthToken','$http', function (AuthToken, $http) {
		var url = 'http://localhost:3000/jobs';

    $http.get(url).success(function (res) {
      
    }).error(function (err) {
    
    });
	}]);