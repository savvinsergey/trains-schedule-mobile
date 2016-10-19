(function(){
  'use strict';

  angular.module('trainsScheduleApp.modules.schedule')
    .factory('NoticesSvc',
      [ '$interval',
        '$window',
        'CONFIG',
        '$ionicPlatform',
        '$cordovaVibration',
        '$cordovaLocalNotification',
         NoticesSvc
      ]);

    function NoticesSvc($interval, $window, CONFIG, $ionicPlatform, $cordovaVibration, $cordovaLocalNotification){

      return {
        notices: [],

        runObserve: function run() {

          $interval(function() {
            var currentIime = moment().unix(),
                itemIndex;

            this.notices.forEach(function(item,i){
              if (item.time <= currentIime) {
                $ionicPlatform.ready(function(){

                  if ($window.cordova && $window.cordova.plugins) {
                    $cordovaVibration.vibrate(300);
                    $cordovaLocalNotification.schedule({
                      id: 1,
                      title: "!NOTICE!",
                      text: "You should go to train station"
                    });
                  }

                });

                itemIndex = i;
              }
            });

            if(itemIndex !== undefined) {
              this.notices.splice(itemIndex,1);
            }
          }.bind(this),CONFIG.checkIntervalTime * 1000)
        },

        checkNotice: function checkNotice(checkedItem) {
          var result,
              checkedItemArrival = moment(checkedItem.arrival,'YYYY-MM-DD HH:mm:ss').unix();

          this.notices.forEach(function(item) {
            if (checkedItemArrival === item.id && !result) {
              result = true;
            }
          });

          return !!result;
        },

        addNotice: function setNotice(item) {
          this.notices.push({
            id   : moment(item.arrival,'YYYY-MM-DD HH:mm:ss').unix(),
            time : moment(item.arrival,'YYYY-MM-DD HH:mm:ss').subtract(1,'hour').unix(),
            type :'arrival'
          });
        },

        removeNotice: function removeNotice(item) {
          this.notices.splice(this.notices.indexOf(item),1);
        }

      }

    }

}());
