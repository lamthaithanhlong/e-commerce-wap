const OrderController = require('../controller/orderController')
const express = require('express');
const options = {
    "caseSensitive":false
}
const router = express.Router(options)

const orderController = new OrderController()
router.get('/',async(req, res) => {
    await orderController.getOrders()
        .then((data) => res.send(data))
        .catch(err => err)
})
router.post('/submit',async(req,res,next) => {
    let id = req.body.id
    let createdTime = req.body.createdTime
    let products = req.body.products
    let totalPrice = req.body.totalPrice
    await orderController.submitOrder(id,createdTime,products,totalPrice).then(data => {
        res.send(data)
    }).catch(err => res.send(err))
})
module.exports = router