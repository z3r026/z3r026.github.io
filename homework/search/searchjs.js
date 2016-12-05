$('#query').keyup(function(){
  // All code will be inside of this block
}); // end keyup

    var value = $('#query').val();

    var rExp = new RegExp(value, "i");

$.getJSON("https://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
  console.log(data);
  }); // end getJSON


$('#query').keyup(function() {
  var value = $('#query').val();
  var rExp = new RegExp(value, "i");
  $.getJSON("https://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function(data) {
    console.log(data); // test for JSON received
    // Begin building output
    var output = '<ol>';
    $.each(data.RESULTS, function(key, val) {
      if (val.name.search(rExp) != -1) {
        output += '<li>';
        output += '<a href="https://www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
        output += '</li>';
      }
    }); // end each
    output += '</ol>';
    $("#searchResults").html(output); // send results to the page
  }); // end getJSON
}); // end onkeyup

