const Cart = require('../model/cart')
const FileSystem = require('../util/fileSystem')
const cart = new Cart();
const fileSystem = new FileSystem('../cart.json')
const data = fileSystem.getFile

class CartController {
    constructor() {}
    getCarts() {
        return data
            .then((res) => {console.log(res)})
            .catch((err) => {console.log(err)})
    }
    getAllProductsInCart() {
        return data
            .then((res) => {console.log(res.products)})
    }
    saveCart(id,createdTime,products,totalPrice) {
        let item = {
            id,
            createdTime,
            products: [
                products
            ],
            totalPrice
        }
        return data
            .then(() => fileSystem.saveFile = item)
            .catch((err) => {console.log(err)})
    }
}
let cartController = new CartController()
cartController.saveCart()
cartController.getAllProductsInCart()
module.exports = CartController