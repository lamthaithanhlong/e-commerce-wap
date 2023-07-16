const fs = require('fs');
const path = require('path');

class FileSystem {
    #filename
    constructor(filename) {
        this.#filename = path.join(__dirname, filename);
    }
    set setFilename(filename) {this.#filename = filename;}
    get getFilename() {return this.#filename}
    saveFile(updateContent) {
        return fs.writeFileSync(this.getFilename, updateContent, 'utf8')
    }
    getFile() {
        return fs.readFileSync(this.getFilename, 'utf8')
    }
}
module.exports = FileSystem