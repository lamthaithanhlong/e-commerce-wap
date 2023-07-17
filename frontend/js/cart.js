class CartPage {
    constructor() {
        this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        this.init();
    }

    init() {
        this.getUserInformation();
        this.attachEventListeners();
        this.calculateCartTotal();
        this.renderCartItems();
        this.highlightSelectedButton();
    }

    getUserInformation() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            document.getElementById('username').textContent = "Welcome, " + currentUser.name + "!";
        } else {
            document.getElementById('cart').textContent = "You are not allowed to access the page, Please login first.";
            document.getElementById('logoutBtn').textContent = "Login"
            document.getElementById('username').textContent = "You are logged out. Please log in again.";
        }
    }

    generateUniqueId() {
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const newId = (existingCartItems.length + 1).toString().padStart(3, '0');
        return newId;
    }

    calculateCartTotal() {
        const totalPriceElement = document.getElementById('totalPrice');
        const totalQuantityElement = document.getElementById('totalQuantity');
        if (totalPriceElement && totalQuantityElement) {
            let total = 0;
            let quantity = 0;

            this.cartItems.forEach((item) => {
                total += item.price * item.quantity;
                quantity += item.quantity;
            });
            if (quantity != 0 && total != 0) {
                totalPriceElement.textContent = `${total.toFixed(2)}`;
                totalQuantityElement.textContent = quantity.toString();
            } else {
                document.getElementById('cart-total').textContent = "You don't have any items in the cart. Please take your time to add more items before proceeding with your purchase."
            }
        }
        localStorage.setItem('totalPrice', JSON.stringify(totalPriceElement.textContent));
    }

    updateCartItemQuantity(index, quantity) {
        if (quantity >= 1) {
            this.cartItems[index].quantity = quantity;
            this.calculateCartTotal();
        }
    }

    saveCartItems() {
        console.log("hello")
        let totalPrice = JSON.parse(localStorage.getItem('totalPrice'))
        let currentUserId = JSON.parse(localStorage.getItem('currentUser')).id
        const createdTime = new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
        const cartCheckOutInfo = {
            "id": this.generateUniqueId(),
            "createdTime": createdTime,
            "products": [this.cartItems],
            "totalPrice": totalPrice,
            "orderUserId": currentUserId
        }
        fetch('http://localhost:3000/order/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartCheckOutInfo)
        })
            .then(response => {
                if (response.ok) {
                    return console.log(response.json());
                } else {
                    throw new Error('Login request failed');
                }
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log('Error occurred during login:', error);
            });
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
        localStorage.setItem('cartCheckOutItems', JSON.stringify(cartCheckOutInfo));
    }

    renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        const itemMap = new Map();

        this.cartItems.forEach((item) => {
            if (itemMap.has(item.name)) {
                itemMap.get(item.name).quantity += item.quantity;
            } else {
                itemMap.set(item.name, { ...item });
            }
        });

        itemMap.forEach((item) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');

            const itemNameElement = document.createElement('span');
            itemNameElement.textContent = item.name;
            cartItemElement.appendChild(itemNameElement);

            const itemQuantityInput = document.createElement('input');
            itemQuantityInput.type = 'number';
            itemQuantityInput.value = item.quantity;
            itemQuantityInput.min = '1';
            itemQuantityInput.addEventListener('input', (event) => {
                const quantity = parseInt(event.target.value);
                const index = this.cartItems.findIndex((item) => item.name === itemNameElement.textContent);
                this.updateCartItemQuantity(index, quantity);
            });
            cartItemElement.appendChild(itemQuantityInput);

            cartItemsContainer.appendChild(cartItemElement);
        });
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

        const checkoutBtn = document.getElementById('checkoutBtn')
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function () {
                self.saveCartItems()
                localStorage.removeItem("cartCheckOutItems")
                localStorage.removeItem("cartItems")
                window.location.href = 'cart.html';
                self.switchSection('cart');
            })
        }

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
                // Remove the token from the session storage
                // sessionStorage.removeItem("token");

                // Redirect to login page
                window.location.href = 'login.html';
            });
        }
    }
}

new CartPage();
