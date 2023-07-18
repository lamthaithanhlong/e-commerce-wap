const Order = require('../models/order')
const order = new Order();

class CartController {
    constructor() {}
    getOrders() {
        return order.getOrder()
    }
    submitOrder(id,createdTime,products,totalPrice,orderUserId) {
        let data = order.getOrder()
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
                order.saveOrder(res)
                return res
            })
            .catch((err) => {console.log(err)})
    }
}
module.exports = CartController