(function(){
  'use strict';

  angular.module('trainsScheduleApp.modules.schedule')
    .controller('ScheduleCtrl',
      [ '$scope',
        'ScheduleSvc',
        'NoticesSvc',
        'FiltersSvc',
        '$ionicLoading',
         ScheduleCtrl
      ]);

    function ScheduleCtrl($scope, ScheduleSvc, NoticesSvc, FiltersSvc, $ionicLoading){

      function getSchedule(needLoading) {

        if (needLoading) {
          $ionicLoading.show({
            template: 'Loading...'
          });
        }

        ScheduleSvc.getSchedule()
          .then(function(response){

            self.schedule = response.data.map(function(item){
              item.check = {
                notice : NoticesSvc.checkNotice(item),
                time   : moment(item.arrival,'YYYY-MM-DD HH:mm:ss').unix() < moment().unix()
              };

              return item;
            });

          },console.log)
          .finally(function(){

            if (needLoading) {
              $ionicLoading.hide();
            }

            $scope.$broadcast('scroll.refreshComplete');

          })

      }

      //------------------------------------------------------//

      var self = this;

      this.today = moment().format('YYYY-MM-DD');
      this.schedule = ScheduleSvc.schedule;
      this.notices = NoticesSvc.notices;
      this.filters = FiltersSvc.filters;

      this.initialize = function initialize() {
        getSchedule(true);
        NoticesSvc.runObserve();
      };

      this.doRefresh = function doRefresh(){
        getSchedule(false);
      };

      this.addNotice = function addNotice(item){
        if (item.check.time) {
          return;
        }

        NoticesSvc.addNotice(item);
        item.check.notice = true;
      };

      this.removeNotice = function removeNotice(item){
        if (item.check.time) {
          return;
        }

        NoticesSvc.removeNotice(item);
        item.check.notice = false;
      };

      $scope.$watch(function watchFilters(){
        return self.filters.station;
      },function(newVal,oldVal){
        if(!!newVal && newVal !== oldVal){
          getSchedule(true);
        }
      })

    };

}());
