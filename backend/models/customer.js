const FileSystem = require('../util/fileSystem');
const fileSystem = new FileSystem('../data/customers.json');
const bcrypt = require('bcrypt');
class Customer {
    constructor(id, name, username, phone, password) {
        this.id = id
        this.name = name
        this.username = username
        this.phone = phone
        this.password = password
    }
    set setId(id) { this.id = id }
    set setName(name) { this.name = name }
    set setUsername(username) { this.username = username }
    set setPhone(phone) { this.phone = phone }
    set setPassword(password) { 
        this.password = bcrypt.hashSync(password, 10); 
    }
    get getId() { return this.id }
    get getName() { return this.name }
    get getUsername() { return this.username }
    get getPhone() { return this.phone }
    get getPassword() { return this.password }
    validateRegistrationFields() {
        if (!this.name || !this.username || !this.id || !this.password) {
            throw new Error('All fields are required.');
        }
        return true;
    }
    validateLoginFields() {
        if (!this.username || !this.password) {
            throw new Error('Username and password are required.');
        }
        return true;
    }
    getInfo() {
        return {
            id: this.getId,
            name: this.getName,
            username: this.getUsername,
            phone: this.getPhone,
            password: this.getPassword,
        }
    }
    saveCustomer(updateContent) {
        fileSystem.saveFile = updateContent
    }
    getCustomer() {return fileSystem.getFile}
}
module.exports = Customer