const Cart = require('../model/cart')
const File = require('../util/fileSystem')
const cart = new Cart();
const file = new File()

class CartController {
    constructor() {}
    getCarts() {
        return cart.getAllCart()
    }
    saveCart(id,createdTime,products,totalPrice) {
        file.setFilename = "../cart.json"
        let data = cart.addProductIntoCart(id,createdTime,products,totalPrice)
        file.saveFile(file.getFilename,data)
    }
}
let cartController = new CartController()
cartController.getCarts()
cartController.saveCart("1","2","3","4")
cart.getAllCart()
module.exports = CartController