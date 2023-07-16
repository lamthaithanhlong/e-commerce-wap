document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the form values
  const name = document.getElementById("name").value;
  const username = document.getElementById("username").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  // Send a request to the server to create a new user
  // You can use the Fetch API or AJAX to send the request
  // Handle the response accordingly
});
