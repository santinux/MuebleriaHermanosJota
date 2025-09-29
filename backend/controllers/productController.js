const products = require('../data/products');

// Obtener todos los productos
const getAllProducts = (req, res, next) => {
    try {
        res.json({
            success: true,
            data: products,
            count: products.length
        });
    } catch (error) {
        // En caso de cualquier otro error, lo enviamos al manejador de errores
        next(error);
    }
};

// Obtener producto por ID
const getProductById = (req, res, next) => {
    try {
        const { id } = req.params;
        const product = products.find(p => p.id === parseInt(id));
        
        // Si no se encuentra el producto, se envía el error al manejador de errores
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
        // En caso de cualquier otro error, lo enviamos al manejador de errores
        next(error);
    }
};

// Obtener productos destacados
const getFeaturedProducts = (req, res, next) => {
    try {
        const featuredProducts = products.filter(product => product.featured);
        
        res.json({
            success: true,
            data: featuredProducts,
            count: featuredProducts.length
        });
    } catch (error) {
        // En caso de cualquier otro error, lo enviamos al manejador de errores
        next(error);
    }
};

// Buscar productos
const searchProducts = (req, res, next) => {
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
        // En caso de cualquier otro error, lo enviamos al manejador de errores
        next(error);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getFeaturedProducts,
    searchProducts
};
