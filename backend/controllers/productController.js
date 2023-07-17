const ProductManager = require('../models/product');
const FileSystem = require('../util/fileSystem')
const fileSystem = new FileSystem('../datas/products.json');
const data = fileSystem.getFile

class productController {
  constructor() {}
  getAllProducts() {
    return data
  }
removeProduct(id) {
  return data
    .then((res) => {
      res.map((item,index) => {
        if(item.id == id) {
            res.splice(index,1)
          }
        })
        fileSystem.saveFile = res
        return res
    })
    .catch(err => err)
  };
// get a product by ID
  selectProduct(id) {
  return data
    .then((res) => {
      let target = {}
      res.map((item) => {
        if(item.id == id) {
            target = item
          }
        })
        return target
    }).catch(err => err)
  };
}
module.exports = productController
