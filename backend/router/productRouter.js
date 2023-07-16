const express = require('express');
const router = express.Router();
const ProductController = require('../controller/productController');
const productController = new ProductController()

// Get all products
router.get('/products', async (req, res) => {
    await productController.getAllProducts().then(data => res.send(data))
})
// Remove a product by ID
router.delete('/:productId',async (req, res) => {
    const productId = req.params.productId;
    await productController.removeProduct(productId).then(data => res.send(data))
});

// Select a product by ID
router.get('/select/:productId', async (req, res) => {
    const productId = req.params.productId;
    await productController.selectProduct(productId).then(data => res.send(data))
});

module.exports = router;
