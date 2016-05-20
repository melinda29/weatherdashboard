//GLOBAL VARIABLES
var url = 'https://api.apixu.com/v1/forecast.json?key=7d4d7ea9cc3e45ab97291728162804&q=Cape%20Town';

//GET WEATHER DATA CALL
var getWeatherData = function() {
	$('#loader').show();
	$.ajax({
	  dataType: 'json',
	  url: url,
	  method: 'GET',
	  error: function() {
          $('#info').html('<p>An error has occurred</p>');
       },
	  success: function (data) {
	  	$('#loader').hide();
	  	$('#weatherDataContainer').fadeIn(800);
	  	
	  	var storePrecip =data.current.temp_f,
	  		roundPreci = storePrecip.toFixed();

	  	$('.cityName').html(data.location.name +','+data.location.region);
	  	$('.regionName').html(data.location.region);
	  	$('.countryName').html(data.location.country);
	  	$('#iconImg').find('img').attr('src',data.current.condition.icon);
	  	$('.weatherDescription').html(data.current.condition.text);
	  	$('.tempC').html(data.current.temp_c);
	  	$('.tempF').html(roundPreci);
	  	$('.windSpeed').html('Wind: '+data.current.wind_kph+'km/h');
	  	$('.windSpeedMph').html('Wind: '+data.current.wind_mph+'mp/h');
	  	$('.humidity').html('Humidity: '+data.current.humidity+'%');
	  	$('.precipIn').html('Precipitation: '+data.current.precip_in+'%');
	  	$('.precipMm').html('Precipitation: '+data.current.precip_mm+'%');

	  }
	});

};

// GET CURRENT DATE
var getCurrentDate = function() {

	var date = new Date(),
	  	weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],

		weekday = weekdays[date.getDay()],
		month = date.getMonth() + 1,
		year = date.getYear(),
		setDate = weekday;

	$('.currentDay').html(setDate);
	
};

//DOCUMENT READY
$(function () {
	getWeatherData();
	getCurrentDate();

	$('.Celsius').on('click', function() {
		$(this).addClass('active');
		$('.Fahrenheit').removeClass('active');
		$('.tempC, .windSpeed, .precipIn').show();
		$('.tempF, .windSpeedMph, .precipMm').hide();
	});

	$('.Fahrenheit').on('click', function() {
		$(this).addClass('active');
		$('.Celsius').removeClass('active');
		$('.tempF, .windSpeedMph, .precipMm').show();
		$('.tempC, .windSpeed, .precipIn').hide();
	});

	//REFRESH DATA
	/*setInterval(function(){ 
		 
	}, 3000);*/
});