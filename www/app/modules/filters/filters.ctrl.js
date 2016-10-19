(function(){
  'use strict';

  angular.module('trainsScheduleApp.modules.filters')
    .controller('FiltersCtrl',
      [ 'CONFIG',
        'FiltersSvc',
        FiltersCtrl
      ]);

    function FiltersCtrl(CONFIG, FiltersSvc){

      this.filters  = FiltersSvc.filters;
      this.stations = CONFIG.stations;

    };

}());
