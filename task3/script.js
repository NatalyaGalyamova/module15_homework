const wsUri = "wss://echo-ws-service.herokuapp.com";

const btn = document.querySelector('.btn');
const btnGeo = document.querySelector('.btn-geo');
const output = document.querySelector('.output');

let websocket;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}

btn.addEventListener('click', () => {
  websocket = new WebSocket(wsUri);
  websocket.onmessage = function(evt) {
    writeToScreen(
      '<span style="color: blue;">RESPONSE: ' + evt.data+'</span>'
    );
  };
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
  };
  const message = document.querySelector('input').value;
  writeToScreen("SENT: " + message);
  websocket.send(message);
});

const mapLink = document.querySelector('#map-link');

// Функция, выводящая текст об ошибке
const error = () => {
  writeToScreen('Невозможно получить ваше местоположение');
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;

  writeToScreen(mapLink);
}

btnGeo.addEventListener('click', () => {
  mapLink.href = '';
  if (!navigator.geolocation) {
    writeToScreen('Geolocation не поддерживается вашим браузером');
  } else {
    writeToScreen('Определение местоположения…');
    navigator.geolocation.getCurrentPosition(success, error);
  }
});



