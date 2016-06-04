
var app = angular
  .module('BiblioMarconi', ['ngMaterial','materialCalendar','mdPickers']);

app
  .config(function($mdThemingProvider, $mdDateLocaleProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue', {
      'default': '500', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('yellow', {
      'default': 'A200' // use shade 200 for default, and keep all other shades the same
    });


    $mdDateLocaleProvider.months = ['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];
    $mdDateLocaleProvider.shortMonths = ['gen','feb','mar','apr','mag','giu','lug','ago','set','ott','nov','dic'];
    $mdDateLocaleProvider.days = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
    $mdDateLocaleProvider.shortDays = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
    $mdDateLocaleProvider.firstDayOfWeek = 1;
    $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
    return 'Settimana ' + weekNumber;
    };
    $mdDateLocaleProvider.msgCalendar = 'Calendario';
    $mdDateLocaleProvider.msgOpenCalendar = 'Apri il calendario';


  });