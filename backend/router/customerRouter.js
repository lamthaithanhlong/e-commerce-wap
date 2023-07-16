const express = require('express')
const CustomerController = require('../controller/customerController')
const customerController = new CustomerController()
const router = express.Router()

router.post('/login', async(req, res) => {
    await customerController.login("1","2").then(data => console.log(data)).catch(err => res.send(err))
})

module.exports = router