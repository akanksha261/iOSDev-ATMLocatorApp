var COMMS = (function(){
  var webURL = "https://m.chase.com/PSRWeb/location/list.action"
  var contentType = "application/json";

//checking status of the API request sent
  function onXhrStateChange (xhr){
     if (xhr.readyState == 4)
       {
           if (xhr.status >= 200 && xhr.status < 300)
           {
               console.log('COMMS: success');
           }
           else
           {
               console.log('COMMS: comms failed');
               console.log('comms failed HTTP code ' + xhr.status);
           }
       }
  }

//Query Chase API
  function request(req){
    return new Promise(function(resolve,reject){
      var xhr = new XMLHttpRequest();
      var webUri = "https://m.chase.com/PSRWeb/location/list.action?lat="+req.lat+"&lng="+req.lng;
      console.log('Rest API : '+webUri)
      xhr.open('GET',webUri,true);
      xhr.setRequestHeader('Content-type', contentType);
      xhr.onreadystatechange = function (){
        onXhrStateChange(xhr);
      }
      
      //promise fulfilled - Success case
      xhr.onload = function(){
        resolve(xhr.responseText)
      };

      //promise rejected - failure case
      xhr.onerror = function(){
        reject(xhr.statusText)
      };
      xhr.send();
    });
  }

  return {
    request : request
  };

})();
