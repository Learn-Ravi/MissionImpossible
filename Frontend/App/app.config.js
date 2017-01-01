MissionImpossible.config(['$urlRouterProvider', '$stateProvider', '$httpProvider', '$authProvider', 'CONFIG',
  function ($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, Config) {
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
    $authProvider.google({
      clientId: '596540283880-b2501ifv3orrupt535ri74bcusm7g7kj.apps.googleusercontent.com',
      url: Config.BASE_URL + 'auth/google'
    });
    $authProvider.facebook({
      clientId: '1808475049394857',
      url: Config.BASE_URL + 'auth/facebook',
      authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
      redirectUri: window.location.origin + '/',
      requiredUrlParams: ['display', 'scope'],
      scope: ['email', 'user_birthday', 'user_hometown', 'id'],
      scopeDelimiter: ',',
      display: 'popup',
      oauthType: '2.0',
      popupOptions: {
        width: 580,
        height: 400
      }
    });
    $authProvider.loginUrl = Config.BASE_URL + 'login'
    $authProvider.signupUrl = Config.BASE_URL + 'register'
  }
]).run(['$window', function ($window) {
  var params = $window.location.search.substring(1)
  if (params && $window.opener && $window.location.origin === $window.opener.location.origin) {
    var pair = params.split('=');
    var code = decodeURIComponent(pair[1]);
    $window.opener.postMessage(code, $window.location.origin);
  }
}]);