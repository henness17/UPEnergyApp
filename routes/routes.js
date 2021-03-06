module.exports = function(app){
	// routes must include passport
	require('./passport.js')(app);
	var pg = require('./pg');
  var transportation = require('./calculators/transportation');
  var bodyParser = require('body-parser'),
  path = require('path');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false}));

	app.get('/', loggedIn, CheckSettings, function(req, res){
    // Adds user entry to user table no matter what..
    // We'll need to check whether the user is registered or not in pg.js
    pg.CheckRegistration(req.user.id, callback);
    function callback(){
      var UserSettings = pg.GetUserSettings(req.user.id, callback2);
      function callback2(UserSettings){
        console.log("\n\n\n\n\n SUV: " + transportation.GetMpg("SUV") + "MPG");
        res.render('home', {user: req.user, UserSettings: UserSettings});
      }
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

  app.get('/admin', loggedIn, isAdmin, function(req, res){
    res.render('admin', {user: req.user});
  });

  app.get('/settings', loggedIn, CheckSettings, function(req, res){
    var UserSettings = pg.GetUserSettings(req.user.id, callback);
    function callback(UserSettings){
      res.render('settings', {user: req.user, set: true, UserSettings: UserSettings});
    }
  });

  app.get('/profile', loggedIn, CheckSettings, function(req, res){
    res.render('profile', {user: req.user});
  });

  app.get('/feed', loggedIn, CheckSettings, function(req, res){
    res.render('feed', {user: req.user});
  });

  app.get('/friends', loggedIn, CheckSettings, function(req, res){
    res.render('friends', {user: req.user});
  });

  app.get('/fb-login', function(req, res){
    res.render('fb_login');
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

  function isAdmin(req, res, next) {
    if (req.user.id == 1349636185079249) {
        next();
    } else {
        res.redirect('/');
    }
  }

  function CheckSettings(req, res, next){
    pg.CheckSettings(req.user.id, callback);
    //res.render('scenes', {scenes: scenes});
    function callback(userIsSet){
      if(userIsSet){
        next();
      }else{
        res.render('settings', {user: req.user, set: false, UserSettings: {username: ""}});
      }
    }
  }
}