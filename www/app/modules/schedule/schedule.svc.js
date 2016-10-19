(function(){
  'use strict';

  angular.module('trainsScheduleApp.modules.schedule')
    .factory('ScheduleSvc',
      [ '$http',
        'CONFIG',
        'FiltersSvc',
         ScheduleSvc
      ]);

    function ScheduleSvc($http, CONFIG, FiltersSvc){

      return {
        schedule: [],

        getSchedule: function getSchedule(){
          var serialize = function(obj) {
            var str = [];
            for(var p in obj){
              if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              }
            }
            return str.join("&");
          };

          /* TODO: remove mocks */
          return $http.get("https://api.rasp.yandex.net/v1.0/schedule/?" + serialize({
              apikey  : CONFIG.yandexApikey,
              format  : "json",
              station : FiltersSvc.filters.station,
              lang    : 'ru',
              date    : moment().format('YYYY-MM-DD'),
              transport_types : 'train',
              page: 1
            }))
        }
      }

    }

}());
