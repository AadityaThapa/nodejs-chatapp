// Initialize client side socket
const socket = new io("ws://nodejs-chatapp.vercel.app");

// Select the html elements
const input = document.querySelector("input");
const form = document.querySelector("form");
const ul = document.querySelector("ul");
const activity = document.querySelector(".activity");

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
	// clears the activity after the text is sent
	activity.textContent = "";
	// create a new li element
	const li = document.createElement("li");
	// set's the li element's value to data
	li.textContent = data;
	// add that li to the ul
	ul.appendChild(li);
});

input.addEventListener("keypress", () => {
	socket.emit("activity", socket.id.substring(0, 5));
});

// listen for activity
let activityTimer;
socket.on("activity", (name) => {
	activity.textContent = `${name} is typing...`;
	// clear after 3 second
	clearTimeout(activityTimer);
	activityTimer = setTimeout(() => {
		activity.textContent = "";
	}, 3000);
});
