// importing express and socket.io
import express from "express";
import { Server } from "socket.io";
// nodejs modules
import path from "node:path";
import { fileURLToPath } from "node:url";

// making a workaround cause __dirname isn't defined on es modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// setting up the express server
const app = express();
const PORT = process.env.PORT || 3500;

// Using the static assets
app.use(express.static(path.join(__dirname, "public")));

// Listens for connections on port
const expressServer = app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});

const io = new Server(expressServer, {
	// Cross-Origin Resource Sharing
	// what i understood is that we need this so we can access resources from a different domains or ports
	// if the client and server is in different domains then i need to specify the client domain in here
	cors: {
		origin:
			process.env.NODE_ENV === "production"
				? false
				: ["http://localhost:5500", "http://127.0.0.1:5500"],
		// ? if true [note: if we are in prod then replace the false value with the client's domain]
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
		// buffer is a nodejs module which deals with binary data
		console.log(`${socket.id}: ${Buffer.from(data)}`);
		// Send that message back as a string.
		io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
	});
});
