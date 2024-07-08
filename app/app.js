// Initialize client side socket
const socket = new io("ws://localhost:3500");

// Select the html elements
const input = document.querySelector("input");
const form = document.querySelector("form");
const ul = document.querySelector("ul");

// Takes input from the form and sends message to the socket.
form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (input.value) {
		socket.emit("message", input.value);
		input.value = "";
	}
	input.focus();
});

// Listen for messages and takes the data
socket.on("message", (data) => {
	// create a new li element
	const li = document.createElement("li");
	// set's the li element's value to data
	li.textContent = data;
	// add that li to the ul
	ul.appendChild(li);
});
