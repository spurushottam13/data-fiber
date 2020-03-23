// // Create WebSocket connection.
// const socket = new WebSocket('ws://localhost:3000');

// // Connection opened
// socket.addEventListener('open', function (event) {
//     socket.send('Hello Server!');
//     socket.send('data1', "Asdajdkabkbdkabdjkasbkdsbkbkadsbdjksabdkbk")
// });

// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });

// const connection = new WebSocket("ws://localhost:8080/")
// connection.onopen = () => {
  
// connection.send(`{type: "hello", value: "data"}`)
// connection.onmessage = (message) => console.log(message)
//   console.log("There is connection")
// }