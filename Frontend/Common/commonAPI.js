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
        cache: false
      }).success(function (data, status) {
        if (data) {
          deferredObject.resolve({
            success: true,
            data: data,
            status: status
          });
        } else {
          deferredObject.resolve({
            success: false
          });
        }
      }).error(function (error,status) {
        deferredObject.resolve({
          success: false,
          status: status,
          error: error
        });
      });
      return deferredObject.promise;
    }
  }
]);