const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    getFeaturedProducts,
    searchProducts
} = require('../controllers/productController');

// GET /api/productos - Obtener todos los productos
router.get('/', getAllProducts);

// GET /api/productos/featured - Obtener productos destacados
router.get('/featured', getFeaturedProducts);

// GET /api/productos/search - Buscar productos
router.get('/search', searchProducts);

// GET /api/productos/:id - Obtener producto por ID
router.get('/:id', getProductById);

module.exports = router;
