// Websocket module
const ws = require("ws");

// Creates a server at port 3000
const server = new ws.Server({
	port: 3000,
});

// Once we have "connection" established, we listen for sockets.
server.on("connection", (socket) => {
	// listen for a message, and take that message.
	socket.on("message", (message) => {
		// Buffer in Node.js is used to perform operations on raw binary data.
		const buffer = Buffer.from(message);
		// turns binary data into human readable string.
		console.log(buffer.toString());
		// Send that message back as a string.
		socket.send(`${message}`);
	});
});
