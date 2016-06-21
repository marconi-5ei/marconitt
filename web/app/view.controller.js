app
    .controller('ViewCtrl', function($scope, $timeout, $mdSidenav, $log, $filter, $http, MaterialCalendarData, $q, $mdToast, $mdDialog, $rootScope) {

        $scope.direction = "horizontal";
        $scope.selectedDate;
        $scope.options = {};
        $scope.options.types = [];

        $scope.isLoading = true;

        $scope.currentMonth = new Date().getMonth() + 1;
        $scope.currentYear = new Date().getFullYear();

        $scope.events = {};

        $scope.calendar = '';
        var getData = function() {
            var req = {
                method: 'GET',
                //url: 'http://vps226037.ovh.net:8080/api/month/'+ $scope.currentMonth,
                //url: 'http://localhost:8080/api/events/' + parseInt($scope.currentYear) + "/" + (parseInt($scope.currentMonth) - 1)
                url: 'http://vps226037.ovh.net:8080/api/events/' + parseInt($scope.currentYear) + "/" + (parseInt($scope.currentMonth) - 1)
            }
            console.log('http://vps226037.ovh.net:8080/api/events/' + parseInt($scope.currentYear) + "/" + (parseInt($scope.currentMonth) - 1));
            $http(req)
                .then(
                    function(data) {
                        console.log(data);
                        $scope.events = data.data;
                        setContents();
                        $timeout(function() { $scope.isLoading = false }, 1000);

                    },
                    function(err) {
                        console.log(err);
                        $mdToast.show($mdToast.simple().textContent("Errore nel recuperare gli eventi: " + (err.data || "il server non risponde")));
                    }
                );
        }

        var numFmt = function(num) {
            num = num.toString();
            if (num.length < 2) {
                num = "0" + num;
            }
            return num;
        };

        $scope.selectOptions = function() {
            flushCalendar();
            setContents();
        }

        var flushCalendar = function() {
            var date = new Date($scope.currentYear, $scope.currentMonth - 1, 1);
            var days = [];
            while (date.getMonth() == parseInt($scope.currentMonth - 1)) {
                console.log(date);
                MaterialCalendarData.setDayContent(date, " ");
                date.setDate(date.getDate() + 1);
            }
        }

        var setContents = function() {
            var eventsN = new Array();
            $scope.events.forEach(function(event) {
                if ($scope.options.types.indexOf("" + event.type) > -1) {
                    try {
                        eventsN[event.date][event.type] = (eventsN[event.date][event.type] || 0) + 1;
                    } catch (e) {
                        eventsN[event.date] = {};
                        eventsN[event.date][event.type] = 1;
                    }
                }
            });
            Object.keys(eventsN).forEach(function(key) {
                var html = ""
                Object.keys(eventsN[key]).forEach(function(typekey) {
                    html += "<md-button class=\"md-fab md-mini md-tiny type" + typekey + "\" aria-label=\"Events\">" + eventsN[key][typekey] + "</md-button>";
                    //MaterialCalendarData.setDayContent(new Date(key), "<md-button class=\"md-fab md-mini md-tiny type"+typekey+"\" aria-label=\"Events\">"+eventsN[key][typekey]+"</md-button>");//eventsN[key]);
                });
                MaterialCalendarData.setDayContent(new Date(key), html);
            });
            //console.log("-----------------------");
        }

        /*$scope.setDayContent = function(date) {
            loadContentAsync = true;
            var counter = 0;
            var str = "";
            $scope.events.forEach(function(event) {
                if (new Date(date).getTime() === new Date(event.date).getTime()) {
                    console.log(event.date);
                    str += event.description + " ";
                }
            });
            return str;
        };*/

        $scope.dayClick = function(date) {
            $mdDialog.show({
                    templateUrl: 'tpl/dayDialog.tpl.html',
                    controller: 'DayDialogCtrl',
                    clickOutsideToClose: true,
                    locals: {
                        day: date
                    }
                })
                .then(function(answer) {
                    getData();
                    $scope.selectOptions();
                }, function() {
                    getData();
                    $scope.selectOptions();
                });
        };

        $scope.openMenu = function($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };

        $scope.prevMonth = function(date) {
            $scope.currentMonth = date.month;
            $scope.currentYear = date.year;
            getData();
        }
        $scope.nextMonth = function(date) {
            $scope.currentMonth = date.month;
            $scope.currentYear = date.year;
            getData();
        }

        getData();

    });
