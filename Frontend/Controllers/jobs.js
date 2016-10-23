MissionImpossible.controller('JobsCtrl', ['alertProviderService', 'CONFIG','commonAPIService',
  function (AlertProviderService, Config, CommonAPI) {
    var url = Config.BASE_URL + 'jobs';

    var promise = CommonAPI.commonAPICall(Config.API_TYPE_GET, url);
    promise.then(function (result) {
      if (result.success) {
        AlertProviderService.showAlert(Config.ALERT_TYPE_SUCCESS, 'You are on the jobs!');
      } else {
        AlertProviderService.showAlert(Config.ALERT_TYPE_WARNING, 'You are not Authorized!!');
      }
    });
  }
]);