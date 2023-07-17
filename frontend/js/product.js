class ProductPage {
    constructor() {
        this.init();
    }

    init() {
        this.displayProducts();
        this.attachEventListeners();
        this.getUserInformation()
        this.highlightSelectedButton();
    }
    getUserInformation() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            document.getElementById('username').textContent = "Welcome, " + currentUser.name + "!";
        } else {
            document.getElementById('products').textContent = "You are not allowed to access the page, Please login first.";
            document.getElementById('logoutBtn').textContent = "Login"
            document.getElementById('username').textContent = "You are logged out. Please log in again.";
        }
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
                user.forEach(product => {
                    const productItem = document.createElement('div');
                    productItem.classList.add('product-item');

                    const image = document.createElement('img');
                    image.src = product.image;
                    image.alt = product.name;

                    const name = document.createElement('h3');
                    name.textContent = product.name;

                    const price = document.createElement('p');
                    price.textContent = `Price: ${product.price}`;

                    const addButton = document.createElement('button');
                    addButton.textContent = 'Add to Cart';
                    addButton.addEventListener('click', () => {
                        this.addToCart(product);
                    });

                    productItem.appendChild(image);
                    productItem.appendChild(price);
                    productItem.appendChild(name);
                    productItem.appendChild(addButton);
                    productList.appendChild(productItem);
                });
            })
            .catch(error => {
                console.log('Error fetching user information:', error);
            });
    }
    addToCart(product) {
        console.log('Added to cart:', product);

        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingProduct = existingCartItems.find((item) => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity++;
            alert(`New item added to the cart: ${existingProduct.name} (Quantity: ${existingProduct.quantity})`);
        } else {
            product.quantity = 1;
            existingCartItems.push(product);
            alert(`New item added to the cart: ${product.name} (Quantity: ${product.quantity})`);
        }
        localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
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
            productsBtn.addEventListener('click', function () {
                window.location.href = 'product.html';
                self.switchSection('products');
            });
        }

        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', function () {
                window.location.href = 'cart.html';
                self.switchSection('cart');
            });
        }

        const ordersBtn = document.getElementById('ordersBtn');
        if (ordersBtn) {
            ordersBtn.addEventListener('click', function () {
                window.location.href = 'order.html';
                self.switchSection('orders');
            });
        }

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function () {
                localStorage.removeItem('currentUser')
                window.location.href = 'login.html';
            });
        }
    }
}
new ProductPage();
