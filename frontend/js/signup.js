// signup.js

class SignUpPage {
  constructor() {
    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  generateUniqueID() {
    const customerData = JSON.parse(localStorage.getItem('customerData')) || [];
    const nextID = customerData.length + 1;
    const paddedID = String(nextID).padStart(3, '0');
    return `C${paddedID}`;
  }

  submitSignUp() {
    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    const data = {
      id: this.generateUniqueID(),
      name: name,
      username: username,
      phone: phone,
      password: password,
    };
    fetch('http://localhost:3000/customer/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Signup request failed');
        }
      })
      .then(res => {
        console.log(res);
        window.location.assign('login.html')
      })
      .catch(error => {
        console.log('Error occurred during signup:', error);
      });
  }

  attachEventListeners() {
    const self = this;
    const submitBtn = document.getElementById('submitSignUp');
    if (submitBtn) {
      submitBtn.addEventListener('click', function () {
        self.submitSignUp();
      });
    }
  }
}

new SignUpPage();