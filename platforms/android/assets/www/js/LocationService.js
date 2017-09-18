var LocationService = (function(my){
  var locList = [];

  function populateList(data){
    var resultArr = data.locations;
    for (var i=0;i<resultArr.length;i++){
      var locDetail = resultArr[i];
      //if(locDetail.locType == 'atm'){
        locList.push(locDetail);
      //}
    }
    return locList;
  }
  function getLocationList(position){
    var req = {
      lat : position.lat,
      lng : position.lng
    }

    return COMMS.request(req).then(function(data){
        var dataJSON = JSON.parse(data);
        var list = populateList(dataJSON);
        return list;
    }, function(err){
        console.log('Error in web api : '+err);
        return locList;
    });
  }

  return {
    getLocationList : getLocationList
  };

})();

//window.LocationService = LocationService;
