const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getUserOrders, 
  getOrderById,
  getAllOrders,
  getOrderStats,
  updateOrderStatus,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

// Todas las rutas de pedidos requieren autenticación
router.use(authMiddleware);

// Middleware de debug para ver qué rutas se están llamando
router.use((req, res, next) => {
  console.log(`[OrderRoutes] ${req.method} ${req.path}`);
  next();
});

// Crear un nuevo pedido
router.post('/', createOrder);

// Rutas de administración (solo admin) - DEBEN IR ANTES de /:id
router.get('/admin/todos', getAllOrders);
router.get('/admin/estadisticas', getOrderStats);
router.put('/admin/:id/estado', updateOrderStatus);

// Obtener todos los pedidos del usuario (debe ir después de las rutas de admin)
router.get('/', getUserOrders);

// Actualizar o eliminar pedidos del usuario
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

// Obtener un pedido específico (debe ir al final para no interceptar las rutas de admin)
router.get('/:id', getOrderById);

module.exports = router;

