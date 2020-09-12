//función con promesa
function loadJSON(url) {

  return new Promise(function(resolve, reject) {

    let req = new XMLHttpRequest();
    req.open('GET', url);
  
    req.onload = function() {
      if (req.status === 200) {

        resolve(req.response);
      } else {

        reject(Error('La url no se cargó; error code:' + req.statusText));
      }
    };
    req.onerror = function() {

        reject(Error('Error de red.'));
    };

    req.send();
  });
}

//función que llama la promesa
function agregarInfo(){

  let jsonEventos;

  let eventos;

  loadJSON('https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json').then(function(response) {

    jsonEventos = response;
    eventos = JSON.parse(jsonEventos);
    var tableEventos = document.getElementById("tablaEventos").getElementsByTagName('tbody')[0];

    var tableCorrelation = document.getElementById("tableCorrelation").getElementsByTagName('tbody')[0];

    var dictTN = {};
    var dictFN = {};
    var dictFP = {};
    var dictTP = {};
    let i = 0;
    let j = 1;

    for (evento in eventos){
      let events = eventos[evento].events;
      let squirrel = eventos[evento].squirrel;
 
      for (eventoIndividual in events){
        dictFP[events[eventoIndividual]] = 0;
        dictTN[events[eventoIndividual]] = 0;
        dictTP[events[eventoIndividual]] = 0;
        dictFN[events[eventoIndividual]] = 0;
      }

      var row = tableEventos.insertRow(i);
      if(squirrel == true){
        row.className = "table-danger";
      }
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      cell0.innerHTML = j;
      cell1.innerHTML = events;
      cell2.innerHTML = squirrel;
      i++;
      j++;
    }

    for(var key in dictFN) {
      for (evento in eventos){
        let events = eventos[evento].events;
        let squirrel = eventos[evento].squirrel; 

        if(squirrel == false && events.includes(key) == false){
          dictTN[key] = dictTN[key]+1;
        }
        if(squirrel == true && events.includes(key) == false){
          dictFP[key] = dictFP[key]+1;
        }
        if(squirrel == false && events.includes(key)){
          dictFN[key] = dictFN[key]+1;
        }
        if(squirrel == true && events.includes(key)){
          dictTP[key] = dictTP[key]+1;
        }
      }
    }

    var finalDict = {};
    for(var key in dictFN) {
      var value = dictFN[key];
      console.log(key);
      console.log(value);
      let numerator = (dictTP[key]*dictTN[key]) - (dictFP[key]*dictFN[key]);
      let denominator1 = (dictTP[key]+dictFP[key])*(dictTP[key]+dictFN[key])*(dictTN[key]+dictFP[key])*(dictTN[key]+dictFN[key]);
      let denominator2 = Math.sqrt( denominator1 );
      let answer = numerator/denominator2;
      finalDict[key]=answer;
    }

    var items = Object.keys(finalDict).map(function(key) {
      return [key, finalDict[key]];
    });

    items.sort(function(first, second) {
      return second[1] - first[1];
    });

    var x = 0;
    var y = 1;
    for(var key in items) {
      var row1 = tableCorrelation.insertRow(x);
      var cell01 = row1.insertCell(0);
      var cell11 = row1.insertCell(1);
      var cell21 = row1.insertCell(2);
      cell01.innerHTML = y;
      cell11.innerHTML = items[key][0];
      cell21.innerHTML = items[key][1];
      x++;
      y++;
    }
    

  }, function(Error) {
    console.log(Error);
  });

}


//llamado de la función final
agregarInfo();