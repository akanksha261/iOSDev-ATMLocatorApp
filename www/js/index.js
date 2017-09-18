var map, infoWindow, marker;
function initMap() {

  var markers = [];

  // Try HTML5 geolocation. check if geolocation service is supported or not
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
    //Success callback
    function(position) {
      var postionLL = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      //Query the Chase API for getting Locations
    LocationService.getLocationList(postionLL).then(
      //Success callback
        function(atmLocationsCoord){
          //result list is empty
          if(atmLocationsCoord.length == 0 ) {
            window.alert('Error: Locations not available currently.');
            return;
          }

          var mapOptions = {
            zoom : 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          }

          //initializing the map
          map = new google.maps.Map(document.getElementById('map'), mapOptions);
          map.setCenter(postionLL);

          //marker labels
          var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          let atmLocation;
          for(let i=0;i<atmLocationsCoord.length;i++){
             atmLocation = atmLocationsCoord[i];
             var lat = atmLocation.lat;
             var lng = atmLocation.lng;
             var latLng = new google.maps.LatLng(lat,lng);

             //creating markers
             marker = new google.maps.Marker({
               position:latLng,
               map:map,
               label:labels[i%atmLocationsCoord.length]
             });

             markers.push(marker);

             //binding markers with click event handlers
             google.maps.event.addListener(marker, 'click', (function(marker, i) {
                   return function() {
                     var str = atmLocationsCoord[i];
                     //navigate to details page
                     window.location = "detailsPage.html#"+JSON.stringify(str);
                   }
                   })(marker, i));
          }
      },
      //failure callback
      function(failMsg){
        console.log('Error : '+failMsg);
        window.alert('Error: Service not available currently.');
      });
    }, function() {
      //Error handler
      window.alert('Error: The Geolocation service failed.');
    });
  } else {
    // Browser doesn't support Geolocation
    window.alert('Error: Your App doesn\'t support geolocation.',);
  }
}
