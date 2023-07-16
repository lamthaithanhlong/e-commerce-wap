    class App {
        constructor() {
        this.products = [
            { id: 1, name: 'Product 1', imageUrl: 'product1.jpg' },
            { id: 2, name: 'Product 2', imageUrl: 'product2.jpg' },
            { id: 3, name: 'Product 3', imageUrl: 'product3.jpg' },
            { id: 3, name: 'Product 3', imageUrl: 'product3.jpg' },
            { id: 3, name: 'Product 3', imageUrl: 'product3.jpg' },
            { id: 3, name: 'Product 3', imageUrl: 'product3.jpg' },
            { id: 3, name: 'Product 3', imageUrl: 'product3.jpg' },
            // Add more products as needed
        ];
        
        this.init();
        }
    
        init() {
        this.displayProducts();
        // ... Other code for initialization
        }
    
        displayProducts() {
        const productList = document.getElementById('product-list');
    
        this.products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
    
            const image = document.createElement('img');
            image.src = product.imageUrl;
            image.alt = product.name;
    
            const name = document.createElement('h3');
            name.textContent = product.name;
    
            const addButton = document.createElement('button');
            addButton.textContent = 'Add to Cart';
            addButton.addEventListener('click', () => {
            this.addToCart(product);
            });
    
            productItem.appendChild(image);
            productItem.appendChild(name);
            productItem.appendChild(addButton);
    
            productList.appendChild(productItem);
        });
        }
    
        addToCart(product) {
        // Add the product to the cart
        console.log('Added to cart:', product);
        }
    
        // ... Other methods
    }
    
    new App();
    