MissionImpossible.service('commonAPIService', ['$q', '$http',
  function ($q, $http) {
    var _this = this;

    _this.commonAPICall = function (type, url, data) {
      var deferredObject = $q.defer();
      $http({
        method: type,
        url: url,
        headers: {
          'Content-Type': 'application/json'
        },
        data: data,
        async: false,
        cache: false
      }).success(function (data) {
        if (data) {
          deferredObject.resolve({
            success: true,
            data: data
          });
        } else {
          deferredObject.resolve({
            success: false
          });
        }
      }).error(function (Data) {
        deferredObject.resolve({
          success: false
        });
      });
      return deferredObject.promise;
    }
  }
]);