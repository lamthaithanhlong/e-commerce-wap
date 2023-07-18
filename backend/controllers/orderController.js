const Order = require('../models/order')
const FileSystem = require('../util/fileSystem')
const order = new Order();
const fileSystem = new FileSystem('../data/carts.json')
const data = fileSystem.getFile

class CartController {
    constructor() {}
    getOrders() {
        return data
    }
    submitOrder(id,createdTime,products,totalPrice,orderUserId) {
        let item = {
            id,
            createdTime,
            products: [
                products
            ],
            totalPrice,
            orderUserId
        }
        return data
            .then((res) => {
                res.push(item)
                fileSystem.saveFile = res
                return res
            })
            .catch((err) => {console.log(err)})
    }
}
module.exports = CartController