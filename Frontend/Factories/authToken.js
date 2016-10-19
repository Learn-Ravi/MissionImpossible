MissionImpossible.factory('AuthToken', function () {
  var cachedToken,
    userToken = 'userToken',
    _this = this;
  var authToken =  {
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
    }
  };

  return authToken;
});