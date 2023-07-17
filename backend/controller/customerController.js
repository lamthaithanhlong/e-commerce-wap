const Customer = require('../model/customer')
const FileSystem = require('../util/fileSystem')
const customer = new Customer()
const fileSystem = new FileSystem('../data/customers.json')
const data = fileSystem.getFile

class CustomerController {
    constructor() {
        this.init()
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
        return data
    }
    login(username, password) {
        return data
            .then(res => {
                let target = {}
                res.map((item) => {
                    console.log(item.username == username && item.password == password)
                    if (item.username == username && item.password == password) {
                        target = item
                    }
                })
                return target
            }).catch(err => console.log(err))
    }
    register(id, name, username, phone, password) {
        let item = {
            id,
            name,
            username,
            phone,
            password,
        }
        return data
            .then((res) => {
                res.push(item)
                fileSystem.saveFile = res
                return res
            })
            .catch((err) => { console.log(err) })
    }
    generateUser() {
        const newUserCount = 5;
        const newUserList = [];

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
                name: `Default User ${i+1}`,
                username: generateUniqueUsername(i),
                phone: "123",
                password: "123",
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
module.exports = CustomerController