module.exports = function(app){
  var GetMpg = function GetMpg(car_class){
    if (car_class === "SUV"){
   		return 17.6;
   	}else if(car_class === "Passenger"){
   		return 22.1;
   	}else if(car_class === "Van"){
   		return 17.6;
   	}else if(car_class === "Pickup"){
   		return 17.6;
    }else if(car_class === "Motocycle"){
    	return 50;
    }
  };
  module.exports.GetMpg = GetMpg;

  var GetKwPerMiPersonalVehicle = function GetKwPerMiPersonalVehicle(car_class){
  	var kW_conversion = 0.000293;
  	if (car_class === "SUV"){
   		return 5472*kW_conversion;
   	}else if(car_class === "Passenger"){
   		return 2989*kW_conversion;
   	}else if(car_class === "Van"){
   		return 5472*kW_conversion;
   	}else if(car_class === "Pickup"){
   		return 5472*kW_conversion;
    }else if(car_class === "Motocycle"){
    	return 2665*kW_conversion;
    }
  };
  module.exports.GetKwPerMiPersonalVehicle = GetKwPerMiPersonalVehicle;
};