const ws = new WebSocket("ws://localhost:3000/");
//const wsAPI = new WebSocket("ws://localhost:3000/chat/api/messages/");

ws.onmessage = (msg) => {
  //console.log(msg)
  actualizaPágina();
  renderMessages(JSON.parse(msg.data));
};

const renderMessages = (data) => {
  const html = data.map((item) => `<p>${item}</p>`).join(" ");
  document.getElementById("messages").innerHTML = html;
};

const renderMessagesAPI = (data) => {
  const html = data.map((item) => `<p> Message: ${item.message} Author: ${item.author}</p>`).join(" ");
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const message = document.getElementById("message");
  const author = document.getElementById("author");
  const info = " Message: "+message.value + " Author: "+author.value;
  

  var msg = {
    message: message.value,
    author: author.value
  };
  postJSON(msg);

  message.value = "";
  author.value = "";
};

function actualizaPágina(){
  loadJSON('http://localhost:3000/chat/api/messages').then(function(response) {

    let mensajesJSON = response;
    let mensajes = JSON.parse(mensajesJSON);
    renderMessagesAPI(mensajes);

  }, function(Error) {
    console.log(Error);
  });
}

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);

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

function postJSON(dataJSON){
  var xhr = new XMLHttpRequest();
  var url = "http://localhost:3000/chat/api/messages/";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
          var json = JSON.parse(xhr.responseText);
          console.log(json.message + ", " + json.author);
      }
  };
  var data = JSON.stringify(dataJSON);
  xhr.send(data);
  ws.send(data);
}