module.exports = function(app){
	// routes must include passport
	require('./passport.js')(app);
	var pg = require('./pg');
  var bodyParser = require('body-parser'),
      path = require('path');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false}));

	app.get('/', loggedIn, function(req, res){
    // Adds user entry to user table no matter what..
    // We'll need to check whether the user is registered or not in pg.js
    pg.CheckRegistration(req.user.id, callback);
    function callback(){
      res.render('home', {user: req.user});
    }
  });

  app.get('/login', function(req, res){
    res.render('login', {user: req.user});
  });

  app.get('/navigation', function(req, res){
    res.render('navigation', {user: req.user});
  });

  app.get('/social', function(req, res){
    res.render('social', {user: req.user});
  });

  app.get('/settings', function(req, res){
    res.render('settings', {user: req.user});
  });

  function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
  }
}