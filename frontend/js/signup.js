class SignUpPage {
  constructor() {
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.generateUniqueID().then((nextId) => {
      console.log(nextId);
      document.getElementById('getId').textContent = "CurrentID: " + nextId;
    });
  }

  generateUniqueID() {
    return fetch('http://localhost:3000/customer')
      .then(response => response.json())
      .then(data => {
        const maxId = data.reduce((max, customer) => {
          const idNumber = parseInt(customer.id.substring(1));
          return idNumber > max ? idNumber : max;
        }, 0);
        const nextId = `C${String(maxId + 1).padStart(3, '0')}`;
        return nextId;
      })
      .catch(error => {
        console.log('Error occurred:', error);
      });
  }

  submitSignUp() {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    this.generateUniqueID().then((nextId) => {
      const data = {
        id: nextId,
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
            window.location.assign('login.html');
            return response.json();
          } else {
            document.getElementById("headerMessage").textContent = "Error Status " + response.status;
            return Promise.reject(new Error('Signup request failed'));
          }
        })
        .catch(error => {
          console.log('Error occurred during signup:', error);
        });
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
