class LoginPage {
  constructor() {
    this.init()
  }
  init() {
    this.attachEventListeners()
  }
  submitLogin() {
    const statusResponse = document.getElementById('statusResponse')
    const username = document.getElementById('username').value; // Set the desired username
    const password = document.getElementById('password').value; // Set the desired password 
    const data = {
      "username": username,
      "password": password
    };
    fetch('http://localhost:3000/customer/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Login request failed');
        }
      })
      .then(res => {
        let currentUser = {
            id : res.id,
            name: res.name,
            username: res.username,
            phone: res.phone,
            password: res.password
        }
        console.log(res)
        if(res.id != null || res.id != undefined) {
          localStorage.removeItem('currentUser')
          localStorage.setItem('currentUser',JSON.stringify(currentUser))
          window.location.assign('home.html')
        } else {
          console.log("invalid login")
          statusResponse.textContent = "The credential is not valid, Please try again"
        }
      })
      .catch(error => {
        console.log('Error occurred during login:', error);
      });
  }  
  attachEventListeners() {
    const self = this
    
    const testBtn = document.getElementById("submitLogin")
    testBtn.addEventListener('click', function () {
      self.submitLogin()
      console.log(localStorage.getItem('cartItems'))
    })
  }
}
new LoginPage()