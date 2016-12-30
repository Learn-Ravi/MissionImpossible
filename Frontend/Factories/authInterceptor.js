MissionImpossible.factory('AuthInterceptor', ['$injector', function ($injector) {
  return {
    request: function (config) {
      var AuthToken = $injector.get('AuthToken');
      var token = AuthToken.getToken();

      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    response: function (response) {
      return response;
    }
  };
}]);