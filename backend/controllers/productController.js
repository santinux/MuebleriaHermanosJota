const Product = require('../models/Product');

// Obtener todos los productos
const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});
        res.json({
            success: true,
            data: products,
            count: products.length
        });
    } catch (error) {
        next(error);
    }
};

// Obtener producto por ID
const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Buscar por ID numérico primero, luego por _id de MongoDB
        let product = await Product.findOne({ id: parseInt(id) });
        
        if (!product) {
            // Si no se encuentra por ID numérico, intentar por _id de MongoDB
            product = await Product.findById(id);
        }
        
        if (!product) {
            const error = new Error('Producto no encontrado');
            error.status = 404;
            return next(error);
        }
        
        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        next(error);
    }
};

// Obtener productos destacados
const getFeaturedProducts = async (req, res, next) => {
    try {
        const featuredProducts = await Product.find({ destacado: true });
        
        res.json({
            success: true,
            data: featuredProducts,
            count: featuredProducts.length
        });
    } catch (error) {
        next(error);
    }
};

// Buscar productos
const searchProducts = async (req, res, next) => {
    try {
        const { q } = req.query;
        
        if (!q) {
            const products = await Product.find({});
            return res.json({
                success: true,
                data: products,
                count: products.length
            });
        }
        
        const filteredProducts = await Product.find({
            $text: { $search: q }
        });
        
        res.json({
            success: true,
            data: filteredProducts,
            count: filteredProducts.length,
            searchTerm: q
        });
    } catch (error) {
        next(error);
    }
};

// Crear un nuevo producto
const createProduct = async (req, res, next) => {
    try {
        const { nombre, descripcion, precio, stock, imagenUrl, categoria, destacado } = req.body;
        
        // Validar campos obligatorios
        if (!nombre || !precio) {
            const error = new Error('El nombre y precio son obligatorios');
            error.status = 400;
            return next(error);
        }
        
        const newProduct = new Product({
            nombre,
            descripcion,
            precio,
            stock: stock || 0,
            imagenUrl,
            categoria,
            destacado: destacado || false
        });
        
        const savedProduct = await newProduct.save();
        
        res.status(201).json({
            success: true,
            data: savedProduct,
            message: 'Producto creado exitosamente'
        });
    } catch (error) {
        next(error);
    }
};

// Actualizar un producto existente
const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        // Validar que el ID sea válido
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            const error = new Error('ID de producto inválido');
            error.status = 400;
            return next(error);
        }
        
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!updatedProduct) {
            const error = new Error('Producto no encontrado');
            error.status = 404;
            return next(error);
        }
        
        res.json({
            success: true,
            data: updatedProduct,
            message: 'Producto actualizado exitosamente'
        });
    } catch (error) {
        next(error);
    }
};

// Eliminar un producto
const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Validar que el ID sea válido
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            const error = new Error('ID de producto inválido');
            error.status = 400;
            return next(error);
        }
        
        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            const error = new Error('Producto no encontrado');
            error.status = 404;
            return next(error);
        }
        
        res.json({
            success: true,
            data: deletedProduct,
            message: 'Producto eliminado exitosamente'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getFeaturedProducts,
    searchProducts,
    createProduct,
    updateProduct,
    deleteProduct
};
