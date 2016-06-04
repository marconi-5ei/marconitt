app
  .controller('InsertCtrl', function ($scope, $timeout, $mdSidenav, $log, $filter, $http, $q, $mdToast, $element) {

    $scope.msg = 'Clicca per testare';

    $scope.noSunday = function(date) {
      var day = date.getDay();
      return day !== 0;
    }

    $scope.test = function() {
        console.log("aa");
        alert(localStorage.token);
      var req = {
        method: 'GET',
        url: 'http://vps226037.ovh.net:8080/api/users?token='+localStorage.token,
      }

      console.log(req);

      $http(req)
      .then(
        function(data){
            console.log(data);
            $scope.msg = data;
          $mdToast.show($mdToast.simple().textContent(data));
        },
        function(err){
            console.log(err);
          $mdToast.show($mdToast.simple().textContent(err));
        }
      );
    }




    /////////////////////////////////
$scope.sizes = [
          "small (12-inch)",
          "medium (14-inch)",
          "large (16-inch)",
          "insane (42-inch)"
      ];
      $scope.toppings = [
        { category: 'meat', name: 'Pepperoni' },
        { category: 'meat', name: 'Sausage' },
        { category: 'meat', name: 'Ground Beef' },
        { category: 'meat', name: 'Bacon' },
        { category: 'veg', name: 'Mushrooms' },
        { category: 'veg', name: 'Onion' },
        { category: 'veg', name: 'Green Pepper' },
        { category: 'veg', name: 'Green Olives' }
      ];
      $scope.selectedToppings = [];
      $scope.printSelectedToppings = function printSelectedToppings(){
        // If there is more than one topping, we add an 'and' and an oxford
        // comma to be gramatically correct.
        if (this.selectedToppings.length > 1) {
          var lastTopping = ', and ' + this.selectedToppings.slice(-1)[0];
          return this.selectedToppings.slice(0,-1).join(', ') + lastTopping;
        }
        return this.selectedToppings.join('');
      };

      $scope.vegetables = ['Corn' ,'Onions' ,'Kale' ,'Arugula' ,'Peas', 'Zucchini'];
      $scope.searchTerm;
      $scope.clearSearchTerm = function() {
        $scope.searchTerm = '';
      };
      // The md-select directive eats keydown events for some quick select
      // logic. Since we have a search input here, we don't need that logic.
      $element.find('input').on('keydown', function(ev) {
          ev.stopPropagation();
      });

  });