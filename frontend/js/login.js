class LoginPage {
  constructor() {
    this.init()
  }
  init() {
    // this.submitLogin()
    this.displayProducts()
    this.actionPerform()
  }
  async submitLogin() {
      // Get the username and password values from the form
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Create an object with the username and password
  const data = {
    username: "john",
    password: "123"
  };
  await fetch('http://localhost:3000/customer/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => console.log(res))
    .then(data => console.log(data))
    .catch(err => console.log(err))
  }

  displayProducts() {
        const productList = document.getElementById('product-list');
        fetch('http://localhost:3000/product', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(user => {
                console.log(user)
            })
            .catch(error => {
                console.log('Error fetching user information:', error);
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