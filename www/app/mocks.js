'use strict';

angular.module('trainsScheduleApp.mocks', ['ngMockE2E'])
  .run(function($httpBackend){

      $httpBackend
        .when("GET",/api\.rasp\.yandex\.net\/v1\.0\/schedule/)
        .respond(200, [
            {
                "departure": "2016-10-19 19:00:00",
                "arrival": "2016-10-20 10:15:00",
                "thread": {
                    "number": "SA 3617",
                    "short_title": "Казань - Санкт Петербург"
                }
            },
            {
                "departure": "2016-10-20 17:00:00",
                "arrival": "2016-10-21 8:15:00",
                "thread": {
                    "number": "ST 1655",
                    "short_title": "Воронеж - Москва"
                }
            },
            {
                "departure": "2016-10-18 06:00:00",
                "arrival": "2016-10-20 1:15:00",
                "thread": {
                    "number": "BA 2657",
                    "short_title": "Симферополь - Москва"
                }
            }

        ]);


      $httpBackend.when("GET").passThrough();

  })
