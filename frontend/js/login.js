class LoginPage {
  constructor() {
    this.init()
  }
  init() {
    // this.submitLogin()
    this.actionPerform()
  }
  submitLogin() {
    const username = "john"; // Set the desired username
    const password = "123"; // Set the desired password
  
    const data = {
      "username": username,
      "password": password
    };
  
    console.log(data);
    fetch('http://localhost:3000/customer/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          return response.json(); // Parse the response as JSON
        } else {
          throw new Error('Login request failed'); // Handle non-successful responses
        }
      })
      .then(data => {
        console.log(data); // Handle the login response data
      })
      .catch(error => {
        console.log('Error occurred during login:', error);
      });
  }  
  actionPerform() {
    const self = this
    
    const testBtn = document.getElementById("testddd")
    testBtn.addEventListener('click', function () {
      self.submitLogin()
    })
  }
}
new LoginPage()