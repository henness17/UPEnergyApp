module.exports = function(app){
	// routes must include passport
	require('./passport.js')(app);
	var pg = require('./pg');
  var bodyParser = require('body-parser'),
      path = require('path');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false}));

	app.get('/', function(req, res){
    res.render('index', {user: req.user});
  });

  app.get('/example', loggedIn, function(req, res){
    res.render('example', {user: req.user});
  });

  function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
  }
}