const express = require('express')
const CustomerController = require('../controller/customerController')
const customerController = new CustomerController()
const router = express.Router()

router.post('/login', async(req, res) => {
    let username = req.body.username
    let password = req.body.password
    await customerController.login(username, password)
    .then(data => res.send(data))
    .catch(err => res.send(err))
})

router.post('/register',async(req,res,next) => {
    let id = req.body.id
    let name = req.body.name
    let username = req.body.username
    let phone = req.body.phone
    let password = req.body.password
    await customerController.register(id,name,username,phone,password)
    .then(data => {res.send(data)})
    .catch(err => res.send(err))
})

module.exports = router