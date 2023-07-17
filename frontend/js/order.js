class OrderPage {
    constructor() {
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.getUserInformation();
        this.loadOrdersFromAPI();
        this.highlightSelectedButton();
    }

    getUserInformation() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            document.getElementById('username').textContent = "Welcome, " + currentUser.name + "!";
        } else {
            document.getElementById('orders').textContent = "You are not allowed to access the page. Please login first.";
            document.getElementById('logoutBtn').textContent = "Login";
            document.getElementById('username').textContent = "You are logged out. Please log in again.";
        }
    }

    loadOrdersFromAPI() {
        // Make a network request to fetch the orders from the API
        fetch('http://localhost:3000/order')
            .then(response => response.json())
            .then(data => {
                // Process the fetched orders data
                this.displayOrders(data);
            })
            .catch(error => {
                console.log('Error occurred while fetching orders:', error);
            });
    }

    displayOrders(orders) {
        const orderList = document.getElementById('orderList');
        const orderUserId = JSON.parse(localStorage.getItem('currentUser')).id;

        const filteredOrders = orders.filter(order => order.orderUserId === orderUserId);

        orderList.innerHTML = '';

        filteredOrders.forEach(order => {
            const listItem = document.createElement('li');
            listItem.classList.add('order-item');

            const orderInfo = document.createElement('div');
            orderInfo.classList.add('order-info');

            const orderId = document.createElement('h3');
            orderId.textContent = `Order ID: ${order.id}`;

            const createdTime = document.createElement('p');
            createdTime.textContent = `Created Time: ${order.createdTime}`;

            const totalPrice = document.createElement('p');
            totalPrice.textContent = `Total Price: ${order.totalPrice}`;

            const products = document.createElement('ul');
            products.classList.add('product-list');

            order.products.forEach((product,index) => {
                console.log("data",product);
                const productItem = document.createElement('li');
                productItem.classList.add('product-item');

                const productName = document.createElement('h4');
                productName.textContent = product.name;

                const productImage = document.createElement('img');
                productImage.src = product[index][1].image;

                const productImage1 = document.createElement('img');
                productImage.src = product[index][0].image;

                productItem.appendChild(productName);
                productItem.appendChild(productImage);
                products.appendChild(productItem);
            });

            orderInfo.appendChild(orderId);
            orderInfo.appendChild(createdTime);
            orderInfo.appendChild(totalPrice);
            listItem.appendChild(orderInfo);
            listItem.appendChild(products);
            orderList.appendChild(listItem);
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
            localStorage.setItem('selectedButton', sectionId);
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
                // Remove the token from the session storage
                // sessionStorage.removeItem("token");

                // Redirect to login page
                window.location.href = 'login.html';
            });
        }
    }
}
new OrderPage();  