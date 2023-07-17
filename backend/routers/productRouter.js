const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const productController = new ProductController()

// Get all products : http://localhost:3000/product
router.get('/', async (req, res) => {
    await productController.getAllProducts().then(data => res.send(data))
})
// Remove a product by ID : http://localhost:3000/product/009
router.delete('/:productId',async (req, res) => {
    const productId = req.params.productId;
    await productController.removeProduct(productId).then(data => res.send(data))
});
// Select a product by ID : http://localhost:3000/product/009
router.get('/:productId', async (req, res) => {
    const productId = req.params.productId;
    await productController.selectProduct(productId).then(data => res.send(data))
});
module.exports = router;
