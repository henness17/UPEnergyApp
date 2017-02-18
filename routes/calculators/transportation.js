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
};