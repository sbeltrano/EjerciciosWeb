let token;

const handleSubmit = (evt) => {
  evt.preventDefault();
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const role = document.getElementById("role");

  var msg = {
    username: username.value,
    password: password.value,
    role: role.value,
  };

  postJSON(msg);
};

function actualizaPágina() {
  loadJSON("http://localhost:3000/chat/api/messages").then(
    function (response) {
      let mensajesJSON = response;
      let mensajes = JSON.parse(mensajesJSON);
      renderMessagesAPI(mensajes);
    },
    function (Error) {
      console.log(Error);
    }
  );
}

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);

function postJSON(dataJSON) {
  var xhr = new XMLHttpRequest();
  var url = "http://localhost:3000/login";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      console.log(json.success + ", " + json.message);
      token = json.token;
    }
  };
  var data = JSON.stringify(dataJSON);
  xhr.send(data);
}
