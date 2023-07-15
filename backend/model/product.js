const fs = require('fs');
const path = require('path');
const databaseFile = '../products.json';

class Product{
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }

    set id(id) {
        this.id = id;
    }
    set name(name) {
        this.name = name;
    }
    set price(price) {
        this.price = price;
    }
    set image(image) {
        this.image = image;
    }
    get id() {
        return this.id;
    }
    get name() {
        return this.name;
    }
    get price() {
        return this.price;
    }
    get image() {
        return this.image;
    }
    getAllProducts() {
        const filePath = path.join(__dirname, databaseFile);
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
}
console.log(new Product().getAllProducts())