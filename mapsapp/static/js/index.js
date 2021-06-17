
  var x = document.getElementById("demo");
  var center = { lat: 49.227463, lng: -16.546097 };
  var input = document.getElementById("pac-input");
  var autocomplete;

  // Create a bounding box with sides ~10km away from the center point
  var defaultBounds = {
      north: center.lat + 0.1,
      south: center.lat - 0.1,
      east: center.lng + 0.1,
      west: center.lng - 0.1,
    };
  
  var options = {
    origin: center,
    strictBounds: false,
    types: ["establishment"],
  };

  // get user's location co-ordinate on page
  // window.onload = function() {
  //   getLocation()
  // };

  function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(input, options);

  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }


  function showPosition(position) {
    options.origin = { lat:position.coords.latitude, lng:position.coords.longitude};
    reset()
  }

  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    }
  }


  function reset() {
    options.bounds = {
      north:  options.origin.lat + 0.1,
      south:  options.origin.lat - 0.1,
      east:  options.origin.lng + 0.1,
      west:  options.origin.lng - 0.1,
    };
    autocomplete.setOptions(options);
    console.log(options)
  }



