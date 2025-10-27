require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/muebleria';
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB conectado para verificación de IDs');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
        process.exit(1);
    }
};

const checkProductIds = async () => {
    try {
        console.log('🔍 Verificando IDs de productos en la base de datos...\n');
        
        // Obtener todos los productos con sus IDs
        const products = await Product.find({}, '_id id nombre precio').limit(10);
        
        console.log('📦 Primeros 10 productos con sus IDs:');
        products.forEach((product, index) => {
            console.log(`${index + 1}. ID numérico: ${product.id || 'NO ASIGNADO'} | MongoDB ID: ${product._id} | Nombre: ${product.nombre} | Precio: $${product.precio}`);
        });
        
        console.log(`\n📊 Total de productos: ${await Product.countDocuments()}`);
        
        // Verificar si hay productos con ID numérico (del archivo original)
        const numericIdProducts = await Product.find({ id: { $exists: true } });
        if (numericIdProducts.length > 0) {
            console.log(`\n⚠️  Encontrados ${numericIdProducts.length} productos con ID numérico:`);
            numericIdProducts.forEach(product => {
                console.log(`   ID numérico: ${product.id} | MongoDB ID: ${product._id} | Nombre: ${product.nombre}`);
            });
        }
        
        console.log('\n✅ Verificación completada');
        
    } catch (error) {
        console.error('❌ Error verificando IDs:', error);
    } finally {
        mongoose.connection.close();
        console.log('🔌 Conexión cerrada');
    }
};

// Ejecutar la verificación
connectDB().then(() => {
    checkProductIds();
});
