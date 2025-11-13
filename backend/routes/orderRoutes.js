const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, getOrderById } = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

// Todas las rutas de pedidos requieren autenticación
router.use(authMiddleware);

// Crear un nuevo pedido
router.post('/', createOrder);

// Obtener todos los pedidos del usuario
router.get('/', getUserOrders);

// Obtener un pedido específico
router.get('/:id', getOrderById);

module.exports = router;

