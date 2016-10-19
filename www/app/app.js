(function(){
  'use strict';

  angular.module('trainsScheduleApp', [
      'trainsScheduleApp.config',
      'trainsScheduleApp.mocks',
      'trainsScheduleApp.modules.schedule',
      'trainsScheduleApp.modules.filters',
      'ionic',
      'ngCordova'
    ])
    .config(['$stateProvider','$urlRouterProvider',config])
    .run(['$ionicPlatform',run]);

    function config($stateProvider,$urlRouterProvider){

      $stateProvider
        .state('app',{
          url: '/app',
          abstract: true,
          templateUrl: 'templates/main.tpl.html'
        })
        .state('app.schedule',{
          url: '/schedule',
          views: {
            'schedule-content':{
              templateUrl: 'app/modules/schedule/schedule.tpl.html',
              controller: 'ScheduleCtrl',
              controllerAs: 'ScheduleVm'
            }
          }
        });

      $urlRouterProvider.otherwise('/app/schedule')

    }

    function run($ionicPlatform) {

      $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
      });

    }

}());

