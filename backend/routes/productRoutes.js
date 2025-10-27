const express = require('express');
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    getFeaturedProducts,
    searchProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// GET /api/productos - Obtener todos los productos
router.get('/', getAllProducts);

// GET /api/productos/featured - Obtener productos destacados
router.get('/featured', getFeaturedProducts);

// GET /api/productos/search - Buscar productos
router.get('/search', searchProducts);

// GET /api/productos/:id - Obtener producto por ID
router.get('/:id', getProductById);

// POST /api/productos - Crear un nuevo producto
router.post('/', createProduct);

// PUT /api/productos/:id - Actualizar un producto existente
router.put('/:id', updateProduct);

// DELETE /api/productos/:id - Eliminar un producto
router.delete('/:id', deleteProduct);

module.exports = router;
