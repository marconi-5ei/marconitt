// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./app/models/user');
var Day    = require('./app/models/day');
var Who    = require('./app/models/who');
    
// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('diegodalboscomarconitt', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// =======================
// routes ================
// =======================
// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// API ROUTES -------------------
// we'll get to these in a second

app.get('/setup', function(req, res) {

  // create a sample user
  /*var nick = new User({ 
    name: 'dalbo', 
    password: '123456--',
    admin: true 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });

  var gb = new Who({
    name: "Gianni Bellini",
    type: 1
  });
  gb.save(function(err,who) {
    if (err) throw err;

    console.log('User saved successfully '+who.id);
    res.json({ success: true });
  });*/

  var d = new Day({
    description: "XYZ altro evento",
    hour_start: 12,
    hour_end: 12.15,
    date: new Date(2016,4,19),
    who: ['5740ad60a543dc300f0d77b1']
  });

  d.save(function(err,day) {
    if (err) throw err;

    console.log('Day saved successfully '+day.id);
    res.json(day);
  });
/*
  Day.find({date: new Date(2016,5,22)}, function(err, days) {
    var dd = days;
    dd.forEach(function(day) {
      day.who.forEach(function(w) {
        day.whos = [];
        Who.findById(w, function(err, ww) {
          console.log(ww);
          day.whos[day.whos.length] = ww;
        });
      })
    }); 
    console.log(dd);   
    res.json(dd);
  });

*/
});

// API ROUTES -------------------

// get an instance of the router for api routes
var apiRoutes = express.Router(); 


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Utente non trovato.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Password errata.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('diegodalboscomarconitt'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});


// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

  apiRoutes.get('/month/:month', function(req, res) {
    var m = parseInt(req.params.month);console.log(m);
    var date = new Date(), y = date.getFullYear();
    var start = new Date(y, m, 1);
    var end = new Date(y, m + 1, 0);
    console.log(start);
    console.log(end);
    Day.find({date: {$gte: start, $lt: end}}, function(err, month) {
      res.json(month);
    });
  });

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {
  console.log(req.headers);
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('diegodalboscomarconitt'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});


// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});


// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);


// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);