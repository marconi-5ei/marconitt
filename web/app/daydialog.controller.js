app
    .controller('DayDialogCtrl', function($scope, $timeout, $mdSidenav, $log, $filter, $http, MaterialCalendarData, $q, $mdToast, $mdDialog, $mdDateLocale, day) {

        $scope.day = day;
        $scope.dayString = $mdDateLocale.days[day.getDay()] + " " + day.getDate() + " " + $mdDateLocale.months[day.getMonth()] + " " + day.getFullYear();

        getData = function() {
            var req = {
                method: 'GET',
                url: 'http://localhost:8080/api/events/' + $scope.day.getFullYear() + "/" + $scope.day.getMonth() + "/" + $scope.day.getDate()
            }
            $http(req)
                .then(
                    function(data) {
                        console.log(data.data);

                    },
                    function(err) {
                        console.log(err);
                        $mdToast.show($mdToast.simple().textContent("Errore nel recuperare gli eventi: " + err.data));
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

        getData();
    });