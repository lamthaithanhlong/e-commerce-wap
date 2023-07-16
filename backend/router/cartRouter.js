const CartController = require('../controller/cartController')
const express = require('express');
const options = {
    "caseSensitive":false
}
const router = express.Router(options)

const cartController = new CartController()

router.get('/carts', (req, res) => {
    res.send(cartController.saveCart("1","2","3","4"))
    res.redirect('/')
})

module.exports = router