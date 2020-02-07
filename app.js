// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:3000/chat');

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
    socket.send('data1', "Asdajdkabkbdkabdjkasbkdsbkbkadsbdjksabdkbk")
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

