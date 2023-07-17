const bcrypt = require('bcrypt');
const Customer = require('../model/customer');
const FileSystem = require('../util/fileSystem');
const fileSystem = new FileSystem('../data/customers.json');
const data = fileSystem.getFile;

class CustomerController {
    constructor() {
        this.customerModel = new Customer();
        this.init();
    }

    init() {
        this.listCustomer().then((data) => {
            if (data == '') {
                this.generateUser();
                console.log("Auto generate default user if empty");
            }
        });
    }

    listCustomer() {
        return data;
    }

    login(username, password) {
        const customerData = this.customerModel;
        customerData.setUsername = username;
        customerData.setPassword = password;
        return data
            .then((res) => {
                console.log(res)
                let target = {};
                res.map((item) => {
                    if (
                        item.username == username &&
                        bcrypt.compareSync(password, item.password)
                    ) {
                        target = item;
                    }
                });
                return target;
            })
            .catch((err) => console.log(err));
    }

    register(id, name, username, phone, password) {
        const customerData = this.customerModel;
        customerData.setId = id;
        customerData.setName = name;
        customerData.setUsername = username;
        customerData.setPhone = phone;
        customerData.setPassword = password;
        return data
            .then((res) => {
                res.push(customerData);
                fileSystem.saveFile = res;
                return res;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    generateUser() {
        const newUserCount = 5;
        const newUserList = [];
        const password = "admin123"

        const hashPassword = bcrypt.hashSync(password, 10)

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
