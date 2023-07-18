const Product = require('../models/product');
const FileSystem = require('../util/fileSystem')
const fileSystem = new FileSystem('../data/products.json');
const product = new Product()
const data = fileSystem.getFile

class productController {
  constructor() { }
  getAllProducts() {
    return product.getProduct()
  }
  removeProduct(id) {
    return data
      .then((res) => {
        res.map((item, index) => {
          if (item.id == id) {
            res.splice(index, 1)
          }
        })
        product.saveProduct(res)
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
          if (item.id == id) {
            target = item
          }
        })
        return target
      }).catch(err => err)
  };
}
module.exports = productController
