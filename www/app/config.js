(function(){
  'use strict';

  angular.module('trainsScheduleApp.config', [])
    .constant('CONFIG',{
       yandexApikey: '3a63b5ec-3a62-4c0b-8c43-1b0559815441',
       checkIntervalTime: 60,
       stations : [
          {
            code: '2014001',
            name: 'Воронеж-1'
          },
          {
            code: '9605172',
            name: 'Придача'
          }
       ]
    });

}());


