// importing nodejs built in http server and socket.io
import { createServer } from "node:http";
import { Server } from "socket.io";

// Creates a http server
const httpServer = createServer();
const port = 3500;

const io = new Server(httpServer, {
	// Cross-Origin Resource Sharing
	// what i understood is that we need this so we can access resources from a different domains or ports
	// if the client and server is in different domains then i need to specify the client domain in here
	cors: {
		origin:
			process.env.NODE_ENV === "production"
				? false
				: ["http://localhost:5500", "http://127.0.0.1:5500"],
		// ? if true
		// : if false
		// if our server is in prod mode then returns false meaning no access to the socket (i guess??)
		// else if our server is in dev mode then it gives localhost:5500 access to the socket
		// liveserver extension uses localhost:5500 as it's default port
	},
});

// Once we have "connection" established, we listen for sockets.
io.on("connection", (socket) => {
	console.log(`User ${socket.id} connected`);
	// listen for a message, and runs the callback function
	socket.on("message", (data) => {
		console.log(data);
		// Send that message back as a string.
		io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
	});
});

httpServer.listen(port, () => {
	console.log(`listening on port ${port}`);
});
