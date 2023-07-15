const fs = require('fs');
const path = require('path');
const databaseFile = '../cart.json'

class FileSystem {
    #filename
    constructor(filename) {
        this.#filename = filename;
    }
    set setFilename(filename) {this.#filename = filename;}
    get getFilename() {return this.#filename}
    saveFile(filename,updateContent) {return fs.writeFileSync(filename,updateContent,'utf8')}
    getFile(filename) {return fs.readFileSync(filename,'utf8')}
}
module.exports = FileSystem