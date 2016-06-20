app
    .controller('DayDialogCtrl', function($scope, $timeout, $mdSidenav, $log, $filter, $http, MaterialCalendarData, $q, $mdToast, $mdDialog, $mdDateLocale, $rootScope,$httpParamSerializerJQLike, day) {

        $scope.day = day;
        $scope.dayString = $mdDateLocale.days[day.getDay()] + " " + day.getDate() + " " + $mdDateLocale.months[day.getMonth()] + " " + day.getFullYear();

        $scope.logged = $rootScope.logged;

        $scope.token = $rootScope.token;

        $scope.otherEvents = new Array();
        $scope.spaggiariEvents = new Array();

        $scope.data;

        getData = function() {
            var req = {
                method: 'GET',
                //url: 'http://localhost:8080/api/events/' + $scope.day.getFullYear() + "/" + $scope.day.getMonth() + "/" + $scope.day.getDate()
                url: 'http://vps226037.ovh.net:8080/api/events/' + $scope.day.getFullYear() + "/" + $scope.day.getMonth() + "/" + $scope.day.getDate()
            }
            $http(req)
                .then(
                    function(data) {
                        $scope.data = data.data;
                        genEvents();
                    },
                    function(err) {
                        console.log(err);
                        $mdToast.show($mdToast.simple().textContent("Errore nel recuperare gli eventi: " + err.data || "il server non risponde.."));
                    }
                );
        };

        $scope.delete = function(element, event) {
            var req = {
                method: 'POST',
                url: 'http://localhost:8080/api/events/' + event._id,
                data: $httpParamSerializerJQLike({ token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7Il9fdiI6ImluaXQiLCJhZG1pbiI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJuYW1lIjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwiYWRtaW4iOnRydWUsInBhc3N3b3JkIjp0cnVlLCJuYW1lIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJhZG1pbiI6dHJ1ZSwicGFzc3dvcmQiOiIxMjM0NTYtLSIsIm5hbWUiOiJkYWxibyIsIl9pZCI6IjU3MTg3YmNjMWNlYTY1MjY1N2Q0YTYwMiJ9LCJfcHJlcyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbbnVsbCxudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXX0sImlhdCI6MTQ2NjQ1MTA5NCwiZXhwIjoxNDY2NTM3NDk0fQ.X6Bd-oK0fUr7WN5kcuvsnR1Hme8MEb8nWubqwfAlcfk"}),//$rootScope.token }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
                // url: 'http://vps226037.ovh.net:8080/api/events/'+event._id
            }
            console.log(req);
            $http(req)
                .then(
                    function(data) {
                        console.log(data);
                        if (data.data.success) {
                            $mdToast.show($mdToast.simple().textContent("Evento eliminato"));
                            //$scope.$parent.selectOptions();
                            element.path[2].remove();
                        }
                    },
                    function(err) {
                        console.log(err);
                        $mdToast.show($mdToast.simple().textContent("Errore nel recuperare gli eventi: " + err.data || "il server non risponde.."));
                    }
                );
        };

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

        genEvents = function() {
            $scope.data.forEach(function(event) {
                if (event.type == 0) {
                    $scope.otherEvents.push(event);
                }
            });
            $scope.data.forEach(function(event) {
                if (event.type == 1) {
                    $scope.spaggiariEvents.push(event);
                }
            });

            console.log($scope.spaggiariEvents);
        }


        getData();
    });
