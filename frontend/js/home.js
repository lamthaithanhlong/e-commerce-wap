class HomePage {
  constructor() {
    this.init();
  }

  init() {
    this.getUserInformation();
    this.attachEventListeners();
    this.highlightSelectedButton();
  }

  getUserInformation() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      document.getElementById('currentUserName').textContent = currentUser.username;
      document.getElementById('currentUserPhone').textContent = currentUser.phone;
      document.getElementById('username').textContent = "Welcome, "+currentUser.name+"!";
    } else {
      document.getElementById('home').textContent = "You are not allowed to access the page, Please login first.";
      document.getElementById('logoutBtn').textContent = "Login"
      document.getElementById('username').textContent = "You are logged out. Please log in again.";
    }
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
      localStorage.setItem('selectedButton', sectionId)
    }
  }

  highlightSelectedButton() {
    const selectedButtonId = localStorage.getItem('selectedButton');
    if (selectedButtonId) {
      const selectedButton = document.getElementById(selectedButtonId + 'Btn');
      if (selectedButton) {
        selectedButton.classList.add('active');
      }
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
        window.location.href = 'cart.html';
        self.switchSection('cart');
      });
    }

    const ordersBtn = document.getElementById('ordersBtn');
    if (ordersBtn) {
      ordersBtn.addEventListener('click', function() {
        window.location.href = 'order.html';
        self.switchSection('orders');
      });
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        // Remove the token from the session storage
        localStorage.removeItem('currentUser')

        // Redirect to login page
        window.location.href = 'login.html';
      });
    }
  }
}

new HomePage();
