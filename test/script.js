const btn = document.getElementById('send-message')

const websocket = new WebSocket('ws://localhost:5000/')
websocket.onopen = () => {
  console.log('Подключение установлено')
}

websocket.onmessage = (event) => {
  console.log('Client got message from server:', event.data)
}

btn.onclick = () => {
  websocket.send('Клик на кнопку')
}