class SignUpPage {
  constructor() {
    this.init();
  }

  init() {
    this.attachEventListeners();
    this.validateForm();
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
        throw error;
      });
  }

  submitSignUp() {
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
            document.getElementById("headerMessage").textContent = "Whoos! it look like you have issue, someone you this username";
            return Promise.reject(new Error('Signup request failed'));
          }
        })
        .catch(error => {
          console.log('Error occurred during signup:', error);
          throw error;
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

  validateForm() {
    const self = this;
    document.getElementById("submitSignUp").addEventListener("click", function (event) {
      event.preventDefault();

      var nameInput = document.getElementById("name");
      var usernameInput = document.getElementById("username");
      var phoneInput = document.getElementById("phone");
      var passwordInput = document.getElementById("password");

      var isValid = true;
      var nameRegex = /^[a-zA-Z\s]+$/; // Only allow letters and spaces in the name
      var usernameRegex = /^\w+$/; // Only allow alphanumeric characters and underscores in the username
      var phoneRegex = /^\d{10}$/; // Require exactly 10 digits for the phone number
      var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // Require at least 8 characters with at least one lowercase letter, one uppercase letter, and one digit in the password

      if (!nameRegex.test(nameInput.value.trim())) {
        isValid = false;
        document.getElementById("headerMessage").textContent = "Please enter a valid name. Only allow letters and spaces in the name";
      }

      if (!usernameRegex.test(usernameInput.value.trim())) {
        isValid = false;
        document.getElementById("getId").textContent = "Please enter a valid username. Only allow alphanumeric characters and underscores in the username";
      }

      if (!phoneRegex.test(phoneInput.value.trim())) {
        isValid = false;
        document.getElementById("headerMessage").textContent = "Please enter a valid phone number. Require exactly 10 digits for the phone number";
      }

      if (!passwordRegex.test(passwordInput.value)) {
        isValid = false;
        document.getElementById("getId").textContent =
          "Please enter a valid password. It must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.";
      }
      if (isValid) {
        self.submitSignUp();
      }
    });
  }
}

new SignUpPage();
