$('#query').keyup(function(){
  // All code will be inside of this block
}); // end keyup

    var value = $('#query').val();

    var rExp = new RegExp(value, "i");

$.getJSON("http://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
  console.log(data);
  }); // end getJSON


$('#query').keyup(function() {
  var value = $('#query').val();
  var rExp = new RegExp(value, "i");
  $.getJSON("http://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function(data) {
    console.log(data); // test for JSON received
    // Begin building output
    var output = '<ol>';
    $.each(data.RESULTS, function(key, val) {
      if (val.name.search(rExp) != -1) {
        output += '<li>';
        output += '<a href="http://www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
        output += '</li>';
      }
    }); // end each
    output += '</ol>';
    $("#searchResults").html(output); // send results to the page
  }); // end getJSON
}); // end onkeyup

// Get weather data from wunderground.com
function getData(input) {
  // Get the data from the wunderground API
  $.ajax({
    url: "http://api.wunderground.com/api/63696bbe36e91f39/geolookup/conditions/q/"
    + input + ".json"
    , dataType: "jsonp"
    , success: function (data) {
      console.log(data);
      var location = data.location.city + ', ' + data.location.state;
      var temp_f = data.current_observation.temp_f;
      console.log('Location is: ' + location);
      console.log('Temp is: ' + temp_f);
      $("#cityDisplay").text(location);
      $("title").html(location + " | Weather Center");
      $("#currentTemp").html(Math.round(temp_f) + '°');
      $("#summary").text(toTitleCase(data.current_observation.icon));
      $("#cover").fadeOut(250);
    }
  });
}

