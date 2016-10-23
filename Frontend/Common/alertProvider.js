MissionImpossible.service('alertProviderService', ['$alertProvider',
  function (AlertProvider) {
    var _this = this;

    _this.showAlert = function (title, body) {
      AlertProvider.open({
        title: title,
        body: body,
        buttons: [{
          label: 'OK!',
          cssClass: 'btn btn-primary',
          action: function () {
            console.log('success')
          }
        }]
      });
    }
  }
]);