const express = require('express');
const router = express.Router();
const { getProductList, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// Routes
router.get('/', getProductList);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
