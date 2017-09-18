
/*Function for receiving details from Map page and parsing the details object*/
function initializePage(){
  var details = window.location.hash.substring(1);
  var det = JSON.parse(details);

  populateTable(det);

}

/*Populating the details received from Chase API*/
function populateTable(det){
  var th = document.getElementById('th0');

  if(det.locType == 'atm') {
    th.appendChild(document.createTextNode(det.bank+' Bank ATM Details'));
  }else {
    th.appendChild(document.createTextNode(det.bank+' Bank Branch Details'));
  }

  var td1 = document.getElementById('td1');
  td1.appendChild(document.createTextNode(det.name));

  var td2 = document.getElementById('td2');
  var addr = det.address + ', ' + det.city + ', ' +det.state + ' - ' + det.zip;
  td2.appendChild(document.createTextNode(addr));

  var tr3 = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  if(det.locType == 'branch') {
    td1.appendChild(document.createTextNode('Phone'));
    td2.appendChild(document.createTextNode(det.phone));
  } else {
    td1.appendChild(document.createTextNode('Services'));
    var serviceArr = det.services;
    var listStr = "<ul>";
    for(var i = 0;i < serviceArr.length; i++) {
      listStr = listStr + "<li>" + serviceArr[i] + "</li>";
    }
    listStr = listStr + "</ul>";
    td2.innerHTML = listStr;
  }

  tr3.appendChild(td1);
  tr3.appendChild(td2);
  document.getElementById('detailTable').appendChild(tr3);

  if(det.locType == 'branch') {
    var tr4 = document.createElement('tr');
    var td41 = document.createElement('td');
    var td42 = document.createElement('td');

    var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    td41.appendChild(document.createTextNode('Lobby Hrs'));
    var LobHArr = det.lobbyHrs;
    var listStr = "<ul>";
    for(var i = 0;i < LobHArr.length; i++) {
      if(LobHArr[i] == ""){
        listStr = listStr + "<li>" + days[i] + " closed </li>";
      }else{
        listStr = listStr + "<li>" + days[i] + " - " +LobHArr[i] + "</li>";
      }
    }
    listStr = listStr + "</ul>";
    td42.innerHTML = listStr;

    tr4.appendChild(td41);
    tr4.appendChild(td42);
    document.getElementById('detailTable').appendChild(tr4);
  }
}

/*Navigate back to Map Page*/
function navBack(){
  window.location = "index.html";
}
