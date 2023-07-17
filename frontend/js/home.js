class HomePage {
  constructor() {
    this.init();
  }

  init() {
    this.fetchUserInformation();
    this.attachEventListeners();
  }

  fetchUserInformation() {
    fetch('http://localhost:3000/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(user => {
        this.updateUsername(user.name);
        // this.updatePhone(user.phone);
      })
      .catch(error => {
        console.log('Error fetching user information:', error);
      });
  }

  updateUsername(name) {
    const usernameElement = document.getElementById('username');
    if (usernameElement) {
      usernameElement.textContent = name;
    }
  }

  switchSection(sectionId) {
    const sections = document.getElementsByClassName('section');
    for (let i = 0; i < sections.length; i++) {
      sections[i].style.display = 'none';
    }

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
      selectedSection.style.display = 'block';
    }

    const buttons = document.getElementsByClassName('nav-button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('active');
    }

    const selectedButton = document.getElementById(sectionId + 'Btn');
    if (selectedButton) {
      selectedButton.classList.add('active');
    }
  }

  attachEventListeners() {
    const self = this;

    const homeBtn = document.getElementById('homeBtn');
    if (homeBtn) {
        homeBtn.addEventListener('click', function () {
            window.location.href = 'home.html';
            self.switchSection('home');
        });
    }

    const productsBtn = document.getElementById('productsBtn');
    if (productsBtn) {
      productsBtn.addEventListener('click', function() {
        window.location.href = 'product.html';
        self.switchSection('products');
      });
    }

    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
      cartBtn.addEventListener('click', function() {
        self.switchSection('cart');
      });
    }

    const ordersBtn = document.getElementById('ordersBtn');
    if (ordersBtn) {
      ordersBtn.addEventListener('click', function() {
        self.switchSection('orders');
      });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        // Remove the token from the session storage
        // sessionStorage.removeItem("token");

        // Redirect to login page
        window.location.href = 'login.html';
      });
    }
  }
}

new HomePage();
