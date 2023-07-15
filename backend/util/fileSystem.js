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
    saveFile(filename,updateContent) {
        try {
            console.log(JSON.stringify(updateContent))
            fs.writeFileSync(filename,JSON.stringify(updateContent),'utf8')
            console.log("saved")
        } catch {
            console.log("err")
        }
    }
    getFile(filename) {return (JSON.parse(fs.readFileSync(filename,'utf8')))}
}
const data = {
        "data": [
            {"title":"app","id":"2"}
        ]
}
let fileSystem = new FileSystem()
fileSystem.saveFile(path.join(__dirname,'../cart.json'),data)
console.log(fileSystem.getFile('../cart.json'))
module.exports = FileSystem