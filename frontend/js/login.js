document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the username and password values from the form
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Send a request to the server for authentication
  // You can use the Fetch API or AJAX to send the request
  // Handle the response accordingly
});
