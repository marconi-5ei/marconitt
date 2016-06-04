app
  .controller('ViewCtrl', function ($scope, $timeout, $mdSidenav, $log, $filter, $http, MaterialCalendarData, $q, $mdToast) {
    $scope.direction = "horizontal";
    $scope.selectedDate = [];

    $scope.currentMonth = new Date().getMonth();

    $scope.events = {};

    $scope.calendar = '';

    var getData = function() {
        var req = {
            method: 'GET',
            url: 'http://vps226037.ovh.net:8080/api/month/'+ $scope.currentMonth,
        }
        $http(req)
            .then(
                function(data){
                  console.log(data);
                    $scope.events = data.data;
                    console.log(new Date($scope.events[0].date));
                    if ($scope.calendar == '') drawCalendar();
                },
                function(err){
                    console.log(err);
                    $mdToast.show($mdToast.simple().textContent("Errore nel recuperare gli eventi: "+err));
                }
            );
    }

    var drawCalendar = function() {
      $scope.calendar = ' <calendar-md flex layout-fill\
        calendar-direction="direction"\
        on-prev-month="prevMonth"\
        on-next-month="nextMonth"\
        on-day-click="dayClick"\
        title-format="\'MMMM y\'"\
        ng-model=\'selectedDate\'\
        week-starts-on="1"\
        day-format="dayFormat"\
        day-label-format="\'EEE\'"\
        day-label-tooltip-format="\'EEEE\'"\
        day-tooltip-format="\'fullDate\'"\
        day-content="setDayContent"\
        disable-future-selection="false"\
        style="height: 100% !important;"\
      ></calendar-md>';
    }

    $scope.toggleLayout = function() {
      $scope.direction = $scope.direction === "vertical" ? "horizontal" : "vertical";
      $scope.dayFormat = $scope.direction === "vertical" ? "EEEE, MMMM d" : "d";
    }

    $scope.setContentViaService = function() {
    }

    var numFmt = function(num) {
        num = num.toString();
        if (num.length < 2) {
            num = "0" + num;
        }
        return num;
    };

    $scope.setDayContent = function(date) {
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
    };

    $scope.dayClick = function(date) {
    };

    $scope.today = function() {

    }

    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.prevMonth = function(month) {
        $scope.currentMonth = month.month;
        getData();
        console.log(month);
    }
    $scope.nextMonth = function(month) {
        $scope.currentMonth = month.month;
        getData();
        console.log(month);
    }

    getData();

  });