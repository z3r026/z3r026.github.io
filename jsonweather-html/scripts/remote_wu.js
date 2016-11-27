// Current Location Scripts
$(function () {

  var status = $('#status');

  (function getGeoLocation() {
    status.text('Getting Location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        // Call the getData function, send the lat and long
        getData(lat, long);

      });
    } else {
      status.text("Your browser doesn't support Geolocation or it is not enabled!");
    }

  })();

  // Get the data from the wunderground API
  function getData(lat, long) {                                  
    $.ajax({
        url: "//api.wunderground.com/api/63696bbe36e91f39/geolookup/conditions/q/" + lat + "," + long + ".json",
        dataType: "jsonp",
        success: function(data) {
        console.log(data);
        
            var location = data['location']['city'] + ','+ data['location']['state'];
            var tempF = data['current_observation'] ['temp_f'];
            var windspeed = data['current_observation'] ['wind_mph'];
            var weather = data['current_observation'] ['weather'];
            
            $('#cityDisplay').html(location);
            $('#currentTemp').html(Math.round(tempF)+"&#176;F");
            $('summary').html(toTitleCase(weather));
            $('#add1') .html("Wind Speed:" +data['current_observation']['wind_mph']+"mph");
            $('#add2') .html("Precipitation:" +data['current_observation']['precip_today_string'])
        
    }
           });

      $("#cover").fadeOut(250);
    }
    
    })
  

  // A function for changing a string to TitleCase
  function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

