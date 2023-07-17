class App {
    constructor() {
        this.cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        this.init();
    }

    init() {
        this.fetchUserInformation();
        this.attachEventListeners();
        this.calculateCartTotal();
        this.renderCartItems();
    }

    fetchUserInformation() {
        // Fetch user information and update the UI
        // ...
    }

    calculateCartTotal() {
        const totalPriceElement = document.getElementById('totalPrice');
        const totalQuantityElement = document.getElementById('totalQuantity');
        if (totalPriceElement && totalQuantityElement) {
            let total = 0;
            let quantity = 0;

            this.cartItems.forEach((item) => {
                console.log(item)
                total += item.price * item.quantity;
                quantity += item.quantity;
            });

            totalPriceElement.textContent = `$${total.toFixed(2)}`;
            totalQuantityElement.textContent = quantity.toString();
        }
    }

    updateCartItemQuantity(index, quantity) {
        if (quantity >= 1) {
            this.cartItems[index].quantity = quantity;
            this.calculateCartTotal();
            this.saveCartItems();
        }
    }

    saveCartItems() {
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
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
        }
    }
    attachEventListeners() {
        const self = this;

        const checkoutBtn = document.getElementById('checkoutBtn')
        if(checkoutBtn) {
            checkoutBtn.addEventListener('click',function() {
                localStorage.clear()
                console.log("clear complete")
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

new App();
