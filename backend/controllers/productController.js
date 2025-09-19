const products = require('../data/products');

// Obtener todos los productos
const getAllProducts = (req, res) => {
    try {
        res.json({
            success: true,
            data: products,
            count: products.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Obtener producto por ID
const getProductById = (req, res) => {
    try {
        const { id } = req.params;
        const product = products.find(p => p.id === parseInt(id));
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }
        
        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Obtener productos destacados
const getFeaturedProducts = (req, res) => {
    try {
        const featuredProducts = products.filter(product => product.featured);
        
        res.json({
            success: true,
            data: featuredProducts,
            count: featuredProducts.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

// Buscar productos
const searchProducts = (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q) {
            return res.json({
                success: true,
                data: products,
                count: products.length
            });
        }
        
        const searchTerm = q.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        
        res.json({
            success: true,
            data: filteredProducts,
            count: filteredProducts.length,
            searchTerm: q
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
            error: error.message
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getFeaturedProducts,
    searchProducts
};
