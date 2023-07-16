const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

// Get all products
router.get('/', productController.getAllProducts);

// Remove a product by ID
router.get('/:productId', productController.removeProduct);

// Select a product by ID
router.get('/select/:productId', productController.selectProduct);

module.exports = router;
