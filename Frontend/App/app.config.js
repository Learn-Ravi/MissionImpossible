MissionImpossible.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', '$authProvider',
  function ($urlRouterProvider, $stateProvider, $httpProvider, $authProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('login', {
      url: '/',
      templateUrl: 'Frontend/Views/login.html',
      controller: 'LoginCtrl'
    }).state('register', {
      url: '/register',
      templateUrl: 'Frontend/Views/register.html',
      controller: 'RegisterCtrl'
    }).state('logout', {
      url: '/logout',      
      controller: 'LogoutCtrl'
    }).state('jobs', {
      url: '/jobs',
      controller: 'JobsCtrl'
    });;

    $httpProvider.interceptors.push('AuthInterceptor');
  }
]).run(['$state',function ($state){
  console.log($state.get());
}]);