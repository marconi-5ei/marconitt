app
    .controller('InsertCtrl', function($scope, $timeout, $mdSidenav, $log, $filter, $http, $q, $mdToast, $element, $rootScope, $httpParamSerializerJQLike) {

        $scope.whos = []
        $scope.searchTerm;
        $scope.msg = 'Clicca per testare';
        $scope.event;

        $scope.noSunday = function(date) {
            var day = date.getDay();
            return day !== 0;
        }

        var init = function() {
            var req = {
                method: 'GET',
                //url: 'http://localhost:8080/api/who'
                url: 'http://vps226037.ovh.net:8080/api/who'
            }

            $http(req)
                .then(
                    function(data) {
                        $scope.whos = data.data;
                    },
                    function(err) {
                        console.log(err);
                    }
                );
        }


        $scope.clearSearchTerm = function() {
            $scope.searchTerm = '';
        };

        var numFmt = function(num) {
            num = num.toString();
            if (num.length < 2) {
                num = "0" + num;
            }
            return num;
        };

        $scope.insert = function() {
          if ($rootScope.logged) {
            who = [];
            for (var k in $scope.event.whos) {
                if ($scope.event.whos.hasOwnProperty(k)) {
                    $scope.event.whos[k].forEach(function(w) {
                      who.push(w._id);
                    });
                }
            }
            var req = {
                method: 'POST',
                //url: 'http://localhost:8080/api/who'
                //url: 'http://vps226037.ovh.net:8080/api/events/' + $scope.event.date.getFullYear() + "/" + $scope.event.date.getMonth() + "/" + $scope.event.date.getDate(),
                url: 'http://localhost:8080/api/events/' + $scope.event.date.getFullYear() + "/" + $scope.event.date.getMonth() + "/" + $scope.event.date.getDate(),
                data: $httpParamSerializerJQLike({
                    hour_start: numFmt($scope.event.hour_start.getHours()) + "." + numFmt($scope.event.hour_start.getMinutes()),
                    hour_end: numFmt($scope.event.hour_end.getHours()) + "." + numFmt($scope.event.hour_end.getMinutes()),
                    description: $scope.event.description,
                    who: who.join(","),
                    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7Il9fdiI6ImluaXQiLCJhZG1pbiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJuYW1lIjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwiYWRtaW4iOnRydWUsInBhc3N3b3JkIjp0cnVlLCJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJhZG1pbiI6dHJ1ZSwicGFzc3dvcmQiOiIxMjM0NTYtLSIsIm5hbWUiOiJkYWxibyIsIl9pZCI6IjU3MTg3YmNjMWNlYTY1MjY1N2Q0YTYwMiJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXX0sImlhdCI6MTQ2NjQ1MTA5NCwiZXhwIjoxNDY2NTM3NDk0fQ.X6Bd-oK0fUr7WN5kcuvsnR1Hme8MEb8nWubqwfAlcfk"// $rootScope.token
                }),
               headers: {
                 'Content-Type': 'application/x-www-form-urlencoded'
               }
            }

            console.log(req);

            $http(req)
                .then(
                    function(data) {
                        console.log(data);
                    },
                    function(err) {
                        console.log(err);
                        $mdToast.show($mdToast.simple().textContent("Errore di rete: "+ err));
                    }
                );
              } else {
                $mdToast.show($mdToast.simple().textContent("Non risulti loggato nel sistema"));
              }
        }

        // The md-select directive eats keydown events for some quick select
        // logic. Since we have a search input here, we don't need that logic.
        $element.find('input').on('keydown', function(ev) {
            ev.stopPropagation();
        });

        init();

    });
