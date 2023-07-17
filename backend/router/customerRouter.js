const express = require('express');
const CustomerController = require('../controller/customerController');
const customerController = new CustomerController();
const router = express.Router();

// Regular expressions for validation
const nameRegex = /^[a-zA-Z\s]+$/; // Only allow letters and spaces in the name
const usernameRegex = /^\w+$/; // Only allow alphanumeric characters and underscores in the username
const phoneRegex = /^\d{10}$/; // Require exactly 10 digits for the phone number
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // Require at least 8 characters with at least one lowercase letter, one uppercase letter, and one digit in the password

router.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    await customerController
        .login(username, password)
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
});

router.post('/register', async (req, res, next) => {
    let id = req.body.id;
    let name = req.body.name;
    let username = req.body.username;
    let phone = req.body.phone;
    let password = req.body.password;

    let isValid = true;

    if (!name.match(nameRegex)) {
        isValid = false;
    }

    if (!username.match(usernameRegex)) {
        isValid = false;
    }

    if (!phone.match(phoneRegex)) {
        isValid = false;
    }

    if (!password.match(passwordRegex)) {
        isValid = false;
    }
    try {
        if (!isValid) {
            res.status(400).send({ error: 'Validation failed' });
            return;
        } else {
            const data = await customerController.register(id, name, username, phone, password);
            res.send(data);
        }
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    await customerController
        .listCustomer()
        .then((data) => res.send(data))
        .catch((err) => res.send(err));
});

module.exports = router;
