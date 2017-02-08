module.exports = function(app){
  require('./passport.js')(app);
  var connect = process.env.PG_CONNECT;
  var pg = require('pg'),
      bodyParser = require('body-parser'),
      path = require('path');
  pg.defaults.ssl = true;
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false}));

  // Check whether a user is registered in database. If not, add them.
  var CheckRegistration = function CheckRegistration(fbid, callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT * FROM public.user WHERE fbid=$1", [fbid], function(err, result){
            if(result.rows.length == 0){
              client.query("INSERT INTO public.user (fbid) VALUES ($1)", [fbid], function(err, result){
                console.log('User added to database with id: ' + fbid);
              }); 
            }
            done(); // Called when connection to database is finished...
            callback(); // To continue code called in routes.js
        }); 
    });
  };
  module.exports.CheckRegistration = CheckRegistration;
};

