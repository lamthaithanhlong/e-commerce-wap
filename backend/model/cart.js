const fs = require('fs');
const path = require('path');
const databaseFile = '../data.json'

class Cart {
    constructor(id,createdTime,products,totalPrice) {
        this.id = id;
        this.createdTime = createdTime;
        this.products = products;
        this.totalPrice = totalPrice;
    }
    set setId(id) {this.id = id;}
    set setCreatedTime(createdTime) {this.createdTime = createdTime}
    set setProducts(products) {this.products = products}
    set setTotalPrice(totalPrice) {this.totalPrice = totalPrice}
    get getId() {return this.id}
    get getCreatedTime() {return this.createdTime}
    get getProducts() {return this.products}
    get getTotalPrice() {return this.totalPrice}
    getAllCart() {
        console.log(path.join(__dirname, databaseFile))
        return JSON.parse(fs.readFileSync(path.join(__dirname, databaseFile),'utf-8'))
    }
}