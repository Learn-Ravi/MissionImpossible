MissionImpossible.factory('AuthToken', ['$window', 'commonAPIService', 'CONFIG', '$q',
  function ($window, commonAPI, Config, $q) {
    var cachedToken,
      userToken = 'userToken';
    var authToken = {
      setToken: function (token) {
        cachedToken = token;
        localStorage.setItem(userToken, token);
      },
      getToken: function () {
        if (!cachedToken)
          cachedToken = localStorage.getItem(userToken);

        return cachedToken;
      },
      isAuthenticated: function () {
        return !!authToken.getToken();
      },
      removeToken: function () {
        cachedToken = null;
        localStorage.removeItem(userToken);
      },
      googleAuth: function () {
        var deferredObject = $q.defer();        
        var options = "width=500, height=500, left=" + ($window.outerWidth - 500) / 2 +
          ",top=" + ($window.outerWidth - 500) / 2.5;
        var urlBuilder = [];
        var clientId = '596540283880-b2501ifv3orrupt535ri74bcusm7g7kj.apps.googleusercontent.com',
          redirectUri = $window.location.origin;
        urlBuilder.push('response_type=code', 'client_id=' + clientId,
          'redirect_uri=' + redirectUri, 'scope= profile email');
        var url = Config.GOOGLE_AUTHCODE_ENDPOINT + urlBuilder.join('&');
        var popUp = $window.open(url, '', options);
        $window.focus();

        var getGoogleAuthToken = function (event) {
          var promise;
          event.target.removeEventListener(event.type, getGoogleAuthToken);
          if ($window.location.origin === event.origin) {
            var googleAuthorizationCode = event.data
            popUp.close();
            var data = {
              code: googleAuthorizationCode,
              redirectUri: redirectUri,
              clientId: clientId
            }
            promise = commonAPI.commonAPICall(Config.API_TYPE_POST, Config.BASE_URL + 'auth/google', data);
            deferredObject.resolve({
              success:true,
              promise: promise
            });
          }
        }
        $window.addEventListener('message', getGoogleAuthToken);
        return deferredObject.promise;
      }
    };
    return authToken;
  }
]);