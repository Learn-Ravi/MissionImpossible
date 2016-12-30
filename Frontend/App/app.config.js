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
    });

    $httpProvider.interceptors.push('AuthInterceptor');
  }
]).run(['$window', function ($window) {
  var params = $window.location.search.substring(1)
  if (params && $window.opener && $window.location.origin === $window.opener.location.origin) {
    var pair = params.split('=');
    var code = decodeURIComponent(pair[1]);
    $window.opener.postMessage(code, $window.location.origin);    
  }
}]);