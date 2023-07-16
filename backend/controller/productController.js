const ProductManager = require('../model/product');
const productManager = new ProductManager();
const products = productManager.getAllProducts();

// Get all products
exports.getAllProducts = (req, res) => {
  return res.send(products);
};

// Remove a product by ID
exports.removeProduct = (req, res) => {
  const productId = req.params.productId;
  for (let i = 0; i < products.length; i++) {
    if(products[i].id == productId) {
        products.splice(i, 1);
    }
  }
  productManager.saveProduct(products)
  return res.status(200).send(products);
};

// get a product by ID
exports.selectProduct = (req, res) => {
  let target = {}
  const productId = req.params.productId;
  products.map((item) => {
    if(item.id == productId) {
      target = item
    }
  })
  return res.status(200).send(target);
};
