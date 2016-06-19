app
    .controller('InsertCtrl', function($scope, $timeout, $mdSidenav, $log, $filter, $http, $q, $mdToast, $element) {

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
                        console.log(data);
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

        $scope.a = function() {
          console.log($scope.event);
        }

        // The md-select directive eats keydown events for some quick select
        // logic. Since we have a search input here, we don't need that logic.
        $element.find('input').on('keydown', function(ev) {
            ev.stopPropagation();
        });

        init();

    });
