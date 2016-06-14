app
    .controller('DayDialogCtrl', function($scope, $timeout, $mdSidenav, $log, $filter, $http, MaterialCalendarData, $q, $mdToast, $mdDialog, $mdDateLocale, day) {

        $scope.day = day;
        $scope.dayString = $mdDateLocale.days[day.getDay()] + " " + day.getDate() + " " + $mdDateLocale.months[day.getMonth()] + " " + day.getFullYear();

        $scope.otherEvents = new Array();
        $scope.spaggiariEvents = new Array();

        $scope.data;

        getData = function() {
            var req = {
                method: 'GET',
                url: 'http://localhost:8080/api/events/' + $scope.day.getFullYear() + "/" + $scope.day.getMonth() + "/" + $scope.day.getDate()
                //url: 'http://vps226037.ovh.net:8080/api/events/' + $scope.day.getFullYear() + "/" + $scope.day.getMonth() + "/" + $scope.day.getDate()
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
        }

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