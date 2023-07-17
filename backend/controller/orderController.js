const Order = require('../model/order')
const FileSystem = require('../util/fileSystem')
const order = new Order();
const fileSystem = new FileSystem('../data/carts.json')
const data = fileSystem.getFile

class CartController {
    constructor() {}
    getOrders() {
        return data
    }
    submitOrder(id,createdTime,products,totalPrice) {
        let item = {
            id,
            createdTime,
            products: [
                products
            ],
            totalPrice
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