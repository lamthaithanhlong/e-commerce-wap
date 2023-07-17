document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get the username and password values from the form
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Create an object with the username and password
  const data = {
    username: username,
    password: password
  };

  // Send a POST request to the server for authentication
  fetch('http://localhost:3000/customer/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      // Successful authentication, handle the response here
      console.log('Authentication successful!');
      Location.href="../"

    } else {
      // Authentication failed, handle the response here
      console.log('Authentication failed!');
    }
  })
  .catch(error => {
    // Handle any network or server errors here
    console.log('An error occurred:', error);
  });
});
