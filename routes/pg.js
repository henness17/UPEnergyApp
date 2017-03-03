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

  // Check whether a user has set their settings.
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

  var SetUserSettings = function SetUserSettings(facebook_id, formResults, callback){
    pg.connect(connect, function(err, client, done){
      // Update mpg here...
      console.log(formResults.furnace);
      client.query("SELECT * FROM public.user_settings WHERE facebook_id=$1", [facebook_id], function(err, result){
        if(err){
          console.log(err);
        }else{
          if(result.rows.length > 0){
            client.query("UPDATE public.user_settings SET username=$1 WHERE facebook_id=$2", [formResults.username, facebook_id], function(err2, result2){
              client.query("UPDATE public.user_buildings SET rooms=$1,floors=$2,furnace=$3,bathrooms=$4,ac=$5,windows=$6  WHERE facebook_id=$7", [formResults.rooms, formResults.floors, formResults.furnace, formResults.bathrooms, formResults.ac, formResults.windows, facebook_id], function(err3, result3){
                console.log(err2);
                console.log(err3);
                done();
                callback();
              });
            });
          }else{
            console.log("Inside the else");
            client.query("INSERT INTO public.user_settings (facebook_id, username) VALUES ($1, $2)", [facebook_id, formResults.username], function(err2, result2){
              client.query("INSERT INTO public.user_buildings (facebook_id, rooms, floors, furnace, bathrooms, ac, windows) VALUES ($1, $2, $3, $4, $5, $6, $7)", [facebook_id, formResults.rooms, formResults.floors, formResults.furnace, formResults.bathrooms, formResults.ac, formResults.windows], function(err3, result3){
                console.log(err3)
                done();
                callback();
              });
            });
          } 
        }
      });
    });
  };
  module.exports.SetUserSettings = SetUserSettings;

  var GetUserSettings = function GetUserSettings(facebook_id, callback){
    var UserSettings = {username: ""};
    pg.connect(connect, function(err, client, done){
      client.query("SELECT * FROM public.user_settings WHERE facebook_id=$1", [facebook_id], function(err, result){
        if(result.rows.length == 0){
          UserSettings.username = "";
        }else
        {
          UserSettings.username = result.rows[0].username;
        }
        done();
        callback(UserSettings);
      });
    });
  };
  module.exports.GetUserSettings = GetUserSettings;
};

