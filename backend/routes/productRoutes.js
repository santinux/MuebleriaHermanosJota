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
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

// Rutas públicas (no requieren autenticación)
// GET /api/productos - Obtener todos los productos
router.get('/', getAllProducts);

// GET /api/productos/featured - Obtener productos destacados
router.get('/featured', getFeaturedProducts);

// GET /api/productos/search - Buscar productos
router.get('/search', searchProducts);

// GET /api/productos/:id - Obtener producto por ID
router.get('/:id', getProductById);

// Rutas protegidas (requieren autenticación y rol admin)
// POST /api/productos - Crear un nuevo producto
router.post('/', authMiddleware, adminMiddleware, createProduct);

// PUT /api/productos/:id - Actualizar un producto existente
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);

// DELETE /api/productos/:id - Eliminar un producto
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
