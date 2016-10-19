(function(){
  'use strict';

  angular.module('trainsScheduleApp.modules.filters')
    .factory('FiltersSvc',
      [ 'CONFIG',  FiltersSvc ]);

    function FiltersSvc(CONFIG) {

      return {
        filters: {
          station: CONFIG.stations[0].code,
          type: ''
        }
      }

    }

}());
