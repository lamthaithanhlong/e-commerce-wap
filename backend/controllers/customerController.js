const bcrypt = require('bcrypt');
const Customer = require('../models/customer');
const customer = new Customer()

class CustomerController {
    constructor() {
        this.customerModel = new Customer();
        this.init();
    }

    init() {
        this.listCustomer().then(data => {
            if(data == '') {
                this.generateUser()
                console.log("Auto generate default user if empty")
            }
        })
    }

    listCustomer() {
        return customer.getCustomer();
    }

    login(username, password) {
        const data = customer.getCustomer()
        return data
            .then((res) => {
                return res.find((item) => item.username === username && bcrypt.compareSync(password, item.password));
            })
            .catch((err) => console.log(err));
    }

    register(id, name, username, phone, password) {
        const data = customer.getCustomer()
        const hashPassword = bcrypt.hashSync(password, 10);
        const customerData = { id, name, username, phone, password: hashPassword };

        return data
            .then((res) => {
                const isIdExists = res.some((item) => item.id === id);
                const isUsernameExists = res.some((item) => item.username === username);

                if (isIdExists || isUsernameExists) {
                    throw new Error('ID or username already exists. Please choose a different ID or username.');
                }

                res.push(customerData);
                customer.saveCustomer(res);
                return res;
            })
            .catch((err) => {
                throw new Error(err);
            });
    }

    generateUser() {
        const data = customer.getCustomer()
        const newUserCount = 5;
        const newUserList = [];
        const password = "admin123";
        const hashPassword = bcrypt.hashSync(password, 10);

        const generateUniqueID = (index) => {
            const paddedIndex = String(index + 1).padStart(3, '0');
            return `C${paddedIndex}`;
        };

        const generateUniqueUsername = (index) => {
            return `user${index + 1}`;
        };

        for (let i = 0; i < newUserCount; i++) {
            const newUser = {
                id: generateUniqueID(i),
                name: `Default User ${i + 1}`,
                username: generateUniqueUsername(i),
                phone: "",
                password: hashPassword,
            };

            newUserList.push(newUser);
        }

        return data
            .then((res) => {
                res.push(...newUserList);
                customer.saveCustomer(res);
                return res;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = CustomerController;

