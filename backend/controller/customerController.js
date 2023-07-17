const Customer = require('../model/customer')
const FileSystem = require('../util/fileSystem')
const customer = new Customer()
const fileSystem = new FileSystem('../data/customers.json')
const data = fileSystem.getFile

class CustomerController {
    constructor() {}
    listCustomer() {
        return data
                .then(res => res).catch(err => console.log(err))
        }
    login(username,password) {
    return data
            .then(res => {
                let isSuccesful = false
                res.customer.map((item) => {
                    console.log(item.username == username && item.password == password)
                    if(item.username == username && item.password == password) {
                        isSuccesful = true
                    }
                })
                return res
            }).catch(err => console.log(err))
    }
    register(id,name,username,phone,password) {
        let item = {
            id,
            name,
            username,
            phone,
            password,
        }
        return data
            .then((res) => {
                res.customer.push(item)
                fileSystem.saveFile = res
                return res
            })
            .catch((err) => {console.log(err)})
    }
}
module.exports = CustomerController