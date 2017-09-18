var map, infoWindow, marker;
function initMap() {
  // Try HTML5 geolocation.
  var markers = [];
  var clickHandler = [];

  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position) {
      var postionLL = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

    LocationService.getLocationList(postionLL).then(
        function(atmLocationsCoord){
          var mapOptions = {
            zoom : 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }

          map = new google.maps.Map(document.getElementById('map'), mapOptions);
          infoWindow = new google.maps.InfoWindow;

          var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          let atmLocation;
          for(let i=0;i<atmLocationsCoord.length;i++){
             atmLocation = atmLocationsCoord[i];
             var lat = atmLocation.lat;
             var lng = atmLocation.lng;
             var latLng = new google.maps.LatLng(lat,lng);
             marker = new google.maps.Marker({
               position:latLng,
               map:map,
               label:labels[i%atmLocationsCoord.length]
             });

             markers.push(marker);

             google.maps.event.addListener(marker, 'click', (function(marker, i) {
                   return function() {
                     var str = atmLocationsCoord[i];
                     window.location = "detailsPage.html#"+JSON.stringify(str);
                   }
                   })(marker, i));
          }

        //  infoWindow.setPosition(new google.maps.LatLng(atmLocationsCoord[0].lat,atmLocationsCoord[0].lng));
          //infoWindow.setContent('Location found.');
          infoWindow.setPosition(postionLL);
          infoWindow.open(map);

          map.setCenter(postionLL);
      });

    /*  infoWindow.setPosition(postionLL);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
*/
    //  map.setCenter(postionLL);
    }, function() {
      //handleLocationError(true, infoWindow, map.getCenter());
    });



  } else {
    // Browser doesn't support Geolocation
  //  handleLocationError(false, infoWindow, map.getCenter());
  }
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
/*  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);*/
}
