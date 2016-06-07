app
  .controller('ViewCtrl', function ($scope, $timeout, $mdSidenav, $log, $filter, $http, MaterialCalendarData, $q, $mdToast) {
    $scope.direction = "horizontal";
    $scope.selectedDate = [];

    $scope.currentMonth = new Date().getMonth()+1;

    $scope.events = {};

    $scope.calendar = '';
    //MaterialCalendarData.setDayContent(today, '<span> :oD </span>')
    var getData = function() {
        var req = {
            method: 'GET',
            //url: 'http://vps226037.ovh.net:8080/api/month/'+ $scope.currentMonth,
            url: 'http://localhost:8080/api/month/'+ (parseInt($scope.currentMonth)-1),
        }
        $http(req)
            .then(
                function(data){
                  console.log(data);
                    $scope.events = data.data;
                    //console.log("Chiamata ok");
                    //console.log(new Date($scope.events[0].date));
                    //if ($scope.calendar == '') drawCalendar();
                    setContents();
                },
                function(err){
                    console.log(err);
                    $mdToast.show($mdToast.simple().textContent("Errore nel recuperare gli eventi: "+err));
                }
            );
    }
/*
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
        style="height: calc(100% - 46px) !important;"\
      ></calendar-md>';
    }*/

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

    var setContents = function() {
        var eventsN = new Array();
        $scope.events.forEach(function(event) {
            eventsN[event.date] = (eventsN[event.date] || 0) + 1;
        });
        Object.keys(eventsN).forEach(function (key) {
            MaterialCalendarData.setDayContent(new Date(key), "<md-button class=\"md-fab md-mini md-minimini\" aria-label=\"Eat cake\">"+eventsN[key]+"</md-button>");//eventsN[key]);
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
    };

    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    $scope.prevMonth = function(month) {
        $scope.currentMonth = month.month;
        getData();
        console.log(month.month);
    }
    $scope.nextMonth = function(month) {
        $scope.currentMonth = month.month;
        getData();
        console.log(month.month);
    }

    getData();

  });