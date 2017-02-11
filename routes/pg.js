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
  var CheckRegistration = function CheckRegistration(facebook_id, callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT * FROM public.user WHERE facebook_id=$1", [facebook_id], function(err, result){
            if(result.rows.length == 0){
              client.query("INSERT INTO public.user (facebook_id) VALUES ($1)", [facebook_id], function(err, result){
                console.log('User added to database with id: ' + facebook_id);
              }); 
            }
            done(); // Called when connection to database is finished...
            callback(); // To continue code called in routes.js
        }); 
    });
  };
  module.exports.CheckRegistration = CheckRegistration;

  var CheckSettings = function CheckSettings(facebook_id, callback){
    pg.connect(connect, function(err, client, done){
        client.query("SELECT * FROM public.user_settings WHERE facebook_id=$1", [facebook_id], function(err, result){
            if(result.rows.length == 0){
              done();
              callback(false);
            }else{
              done();
              callback(true);
            }
        }); 
    });
  };
  module.exports.CheckSettings = CheckSettings;
};

