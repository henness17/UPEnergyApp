module.exports = function(app){
	// routes must include passport
	require('./passport.js')(app);
	var pg = require('./pg');
  var bodyParser = require('body-parser'),
      path = require('path');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false}));

	app.get('/', loggedIn, CheckSettings, function(req, res){
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

  app.get('/home', function(req, res){
    res.redirect('/');
  });

  app.get('/navigation', loggedIn, CheckSettings, function(req, res){
    res.render('navigation', {user: req.user});
  });

  app.get('/social', loggedIn, CheckSettings, function(req, res){
    res.render('social', {user: req.user});
  });

  app.get('/settings', loggedIn, CheckSettings, function(req, res){
    res.render('settings', {user: req.user, set: true});
  });

  app.get('/profile', loggedIn, CheckSettings, function(req, res){
    res.render('profile', {user: req.user});
  });

  app.post('/set-user-settings', loggedIn, function(req, res){
    // If the user requests to join the room, send the fbid and scene id to pg.JoinScene
    pg.SetUserSettings(req.user.id, req.body, callback);
    function callback(){
      res.redirect('/home');
    }
  });

  function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
  }

  function CheckSettings(req, res, next){
      pg.CheckSettings(req.user.id, callback);
      //res.render('scenes', {scenes: scenes});
      function callback(userIsSet){
        if(userIsSet){
          next();
        }else{
          res.render('settings', {user: req.user, set: false});
        }
      }
  }
}