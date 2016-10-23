var MissionImpossible = angular.module('MissionImpossible', ['ui.bootstrap', 'AlertProvider', 'satellizer', 'ngAnimate','ui.router']).constant('CONFIG', {
    'ALERT_TYPE_SUCCESS' : 'Success',
    'ALERT_TYPE_WARNING' : 'Warning',
    'BASE_URL':'http://localhost:3000/',
    'API_TYPE_GET': 'GET',
    'API_TYPE_POST': 'POST'
});