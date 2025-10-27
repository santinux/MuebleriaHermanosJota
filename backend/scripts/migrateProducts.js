require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const products = require('../data/products');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/muebleria';
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB conectado para migración');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
        process.exit(1);
    }
};

const migrateProducts = async () => {
    try {
        // Limpiar la colección existente
        await Product.deleteMany({});
        console.log('Colección de productos limpiada');

        // Mapear los datos existentes al nuevo esquema
        const productsToInsert = products.map(product => ({
            nombre: product.name,
            descripcion: product.description,
            precio: product.price,
            stock: product.stock || 0,
            imagenUrl: product.image,
            categoria: product.category,
            destacado: product.featured || false
        }));

        // Insertar los productos
        const insertedProducts = await Product.insertMany(productsToInsert);
        console.log(`${insertedProducts.length} productos migrados exitosamente`);

        // Mostrar algunos ejemplos
        console.log('\nEjemplos de productos migrados:');
        insertedProducts.slice(0, 3).forEach(product => {
            console.log(`- ${product.nombre}: $${product.precio}`);
        });

    } catch (error) {
        console.error('Error durante la migración:', error);
    } finally {
        mongoose.connection.close();
        console.log('Conexión cerrada');
    }
};

// Ejecutar la migración
connectDB().then(() => {
    migrateProducts();
});
