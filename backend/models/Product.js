const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        trim: true,
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
    },
    descripcion: {
        type: String,
        trim: true,
        maxlength: [500, 'La descripción no puede exceder los 500 caracteres']
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, 'El stock no puede ser negativo']
    },
    imagenUrl: {
        type: String,
        trim: true
    },
    categoria: {
        type: String,
        trim: true,
        maxlength: [50, 'La categoría no puede exceder los 50 caracteres']
    },
    destacado: {
        type: Boolean,
        default: false
    },
    specifications: {
        type: Map,
        of: String,
        default: {}
    }
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

// Índices para mejorar el rendimiento de las consultas
productSchema.index({ nombre: 'text', descripcion: 'text', categoria: 'text' });
productSchema.index({ categoria: 1 });
productSchema.index({ destacado: 1 });

module.exports = mongoose.model('Product', productSchema);
