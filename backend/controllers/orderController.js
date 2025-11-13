const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');

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
        return res.status(400).json({
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
    next(error);
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById
};

