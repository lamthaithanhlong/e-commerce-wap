const bcrypt = require('bcrypt');
const Customer = require('../models/customer');
const FileSystem = require('../util/fileSystem');
const fileSystem = new FileSystem('../datas/customers.json');
const data = fileSystem.getFile;

class CustomerController {
    constructor() {
        this.customerModel = new Customer();
        this.init();
    }

    init() {
        this.generateUser();
        console.log("Auto generate default users");
    }

    listCustomer() {
        return data;
    }

    login(username, password) {
        return data
            .then((res) => {
                return res.find((item) => item.username === username && bcrypt.compareSync(password, item.password));
            })
            .catch((err) => console.log(err));
    }

    register(id, name, username, phone, password) {
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
                fileSystem.saveFile = res;
                return res;
            })
            .catch((err) => {
                throw new Error(err);
            });
    }

    generateUser() {
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
                fileSystem.saveFile = res;
                return res;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = CustomerController;

