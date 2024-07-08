// Initialize client side web socket
const socket = new WebSocket("ws://localhost:3000");

// Select the html elements
const input = document.querySelector("input");
const form = document.querySelector("form");
const ul = document.querySelector("ul");

// Takes input from the form and sends message to the websocket.
form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (input.value) {
		socket.send(input.value);
		input.value = "";
	}
	input.focus();
});

// Listen for messages
socket.addEventListener("message", ({ data }) => {
	const li = document.createElement("li");
	li.textContent = data;
	ul.appendChild(li);
});
