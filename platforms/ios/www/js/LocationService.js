var LocationService = (function(my){
  var locList = [];

  //preparing result list of all locations
  function populateList(data){
    var resultArr = data.locations;
    for (var i = 0;i < resultArr.length; i++){
      locList.push(resultArr[i]);
    }
    return locList;
  }

  //get ATM/Branch locations
  function getLocationList(position){
    var req = {
      lat : position.lat,
      lng : position.lng
    }

    //Sending request for Chase API
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
