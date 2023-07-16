const fs = require('fs');
const path = require('path');

class FileSystem {
    constructor(filename) {
        this.filename = filename;
    }
    set setFilename(filename) {this.filename = filename;}
    get getFilename() {return path.join(__dirname,this.filename)}
    set saveFile(updateContent) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.getFilename, JSON.stringify(updateContent), (err, data) => {
                if(err) {
                    reject(err)
                } else {
                    console.log("saved sucessfully")
                    resolve(data)
                }
            })
        })
    }
    get getFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.getFilename,'utf8', (err, data) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(data))
                }
            })
        })
    }
}
module.exports = FileSystem