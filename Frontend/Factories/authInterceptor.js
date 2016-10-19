MissionImpossible.factory('AuthInterceptor', ['AuthToken', function (AuthToken) {
  return {
    request: function (config) {
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