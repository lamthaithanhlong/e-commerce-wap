const Customer = require('../model/customer')
const FileSystem = require('../util/fileSystem')
const customer = new Customer()
const fileSystem = new FileSystem('../data/customers.json')
const data = fileSystem.getFile

class CustomerController {
    constructor() {}
    login(username,password) {
        let info = {
            username,
            password
        }
    return data
            .then(res => {
                res.datacustomer.map((item) => {
                    if(item.username == username && item.password == password) {
                        return 1
                    }
                    return 0
                })
                console.log(res.customer)
            }).catch(err => err)
    }
}
module.exports = CustomerController