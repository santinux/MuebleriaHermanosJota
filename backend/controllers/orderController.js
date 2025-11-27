const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Crear un nuevo pedido
const createOrder = async (req, res, next) => {
  try {
    const { items, shippingInfo, paymentMethod } = req.body;
    const userId = req.user._id; // Del middleware de autenticación

    // Validar campos requeridos
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'El pedido debe contener al menos un producto'
      });
    }

    if (!shippingInfo || !shippingInfo.nombre || !shippingInfo.email || !shippingInfo.telefono || !shippingInfo.direccion) {
      return res.status(400).json({
        success: false,
        message: 'La información de envío es obligatoria'
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'El método de pago es obligatorio'
      });
    }

    // Calcular total y validar productos
    let total = 0;
    const orderItems = [];

    for (const item of items) {
      // Obtener el ID del producto (puede ser numérico o ObjectId)
      const productId = item.productId || item._id || item.id;
      
      if (!productId) {
        return res.status(400).json({
          success: false,
          message: 'ID de producto no válido'
        });
      }

      // Buscar el producto en la base de datos para obtener información actualizada
      // Intentar primero por ID numérico, luego por _id de MongoDB
      let product = null;
      
      // Verificar si el ID es un número válido
      const isNumericId = !isNaN(productId) && !isNaN(parseInt(productId)) && isFinite(productId);
      
      if (isNumericId) {
        // Buscar por ID numérico en el campo 'id'
        product = await Product.findOne({ id: parseInt(productId) });
      }
      
      // Si no se encuentra por ID numérico o el ID no es numérico, intentar por _id de MongoDB
      if (!product) {
        // Verificar si es un ObjectId válido (24 caracteres hexadecimales)
        if (mongoose.Types.ObjectId.isValid(productId)) {
          product = await Product.findById(productId);
        } else if (!isNumericId) {
          // Si no es numérico ni ObjectId válido, es un ID inválido
          return res.status(400).json({
            success: false,
            message: `ID de producto inválido: ${productId}`
          });
        }
      }
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Producto con ID ${productId} no encontrado`
        });
      }

      const itemTotal = product.precio * item.cantidad;
      total += itemTotal;

      orderItems.push({
        product: product._id,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: item.cantidad,
        imagenUrl: product.imagenUrl
      });
    }

    // Crear el pedido
    const order = new Order({
      user: userId,
      items: orderItems,
      total,
      shippingInfo,
      paymentMethod,
      status: 'pending'
    });

    await order.save();

    // Poblar el usuario en la respuesta
    await order.populate('user', 'nombre email');

    res.status(201).json({
      success: true,
      message: 'Pedido creado exitosamente',
      data: order
    });
  } catch (error) {
    console.error('Error al crear pedido:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    next(error);
  }
};

// Obtener todos los pedidos del usuario autenticado
const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate('items.product', 'nombre imagenUrl');

    res.json({
      success: true,
      data: orders,
      count: orders.length
    });
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    next(error);
  }
};

// Obtener un pedido específico del usuario
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID de pedido inválido'
      });
    }

    const order = await Order.findOne({ _id: id, user: userId })
      .populate('items.product', 'nombre imagenUrl descripcion');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error al obtener pedido:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de pedido inválido'
      });
    }
    next(error);
  }
};

// Obtener todos los pedidos (solo admin)
const getAllOrders = async (req, res, next) => {
  try {
    console.log('getAllOrders - Usuario:', req.user?.email, 'Rol:', req.user?.role);
    
    // Verificar que el usuario sea admin
    if (req.user.role !== 'admin') {
      console.log('getAllOrders - Acceso denegado: usuario no es admin');
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para acceder a esta información'
      });
    }

    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate('user', 'nombre email')
      .populate('items.product', 'nombre imagenUrl');

    console.log('getAllOrders - Pedidos encontrados:', orders.length);

    res.json({
      success: true,
      data: orders,
      count: orders.length
    });
  } catch (error) {
    console.error('Error al obtener todos los pedidos:', error);
    next(error);
  }
};

// Obtener estadísticas de pedidos (solo admin)
const getOrderStats = async (req, res, next) => {
  try {
    // Verificar que el usuario sea admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para acceder a esta información'
      });
    }

    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'nombre email')
      .select('total status createdAt');

    const stats = {
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      ordersByStatus: ordersByStatus.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      recentOrders
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    next(error);
  }
};

// Actualizar estado de un pedido (solo admin)
const updateOrderStatus = async (req, res, next) => {
  try {
    // Verificar que el usuario sea admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para actualizar pedidos'
      });
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID de pedido inválido'
      });
    }

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Estado inválido. Debe ser uno de: ${validStatuses.join(', ')}`
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
      .populate('user', 'nombre email')
      .populate('items.product', 'nombre imagenUrl');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Estado del pedido actualizado exitosamente',
      data: order
    });
  } catch (error) {
    console.error('Error al actualizar estado del pedido:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'ID de pedido inválido'
      });
    }
    next(error);
  }
};

// Actualizar pedido del usuario (solo mientras está pendiente)
const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID de pedido inválido'
      });
    }

    const order = await Order.findOne({ _id: id, user: req.user._id });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Solo se pueden modificar pedidos pendientes'
      });
    }

    const { shippingInfo, paymentMethod } = req.body;

    if (shippingInfo) {
      order.shippingInfo = {
        ...(order.shippingInfo || {}),
        ...shippingInfo
      };
    }

    if (paymentMethod) {
      order.paymentMethod = paymentMethod;
    }

    await order.save();

    res.json({
      success: true,
      message: 'Pedido actualizado exitosamente',
      data: order
    });
  } catch (error) {
    console.error('Error al actualizar pedido:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    next(error);
  }
};

// Eliminar pedido (usuario o admin)
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID de pedido inválido'
      });
    }

    const filter = req.user.role === 'admin'
      ? { _id: id }
      : { _id: id, user: req.user._id };

    const order = await Order.findOne(filter);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }

    if (req.user.role !== 'admin' && order.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Solo puedes eliminar pedidos pendientes'
      });
    }

    await order.deleteOne();

    res.json({
      success: true,
      message: 'Pedido eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar pedido:', error);
    next(error);
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  getOrderStats,
  updateOrderStatus,
  updateOrder,
  deleteOrder
};

