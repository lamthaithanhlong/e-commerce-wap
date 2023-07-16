
const productsPath = '../data/products.json';
const FileSystem = require('../util/fileSystem');
const fileSystem = new FileSystem(productsPath);

class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }
    set setId(id) {this.id = id;}
    set setName(name) {this.name = name;}
    set setPrice(price) {this.price = price;}
    set setImage(image) {this.image = image;}
    get getId() {return this.id;}
    get getName() {return this.name;}
    get getPrice() {return this.price;}
    get getImage() {return this.image;}
    saveProduct(updateContent) {
        fileSystem.saveFile(JSON.stringify(updateContent))
    }
}
module.exports = Product