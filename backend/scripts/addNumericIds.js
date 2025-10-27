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
        console.log('MongoDB conectado para agregar IDs numéricos');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
        process.exit(1);
    }
};

const addNumericIds = async () => {
    try {
        console.log('🔧 Agregando IDs numéricos a los productos...\n');
        
        // Obtener todos los productos
        const products = await Product.find({});
        
        console.log(`📦 Procesando ${products.length} productos...`);
        
        // Agregar ID numérico a cada producto
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const numericId = i + 1; // ID numérico empezando desde 1
            await Product.findByIdAndUpdate(product._id, { id: numericId });
            console.log(`${i + 1}. ${product.nombre} - ID: ${numericId} (MongoDB: ${product._id})`);
        }
        
        console.log('\n✅ IDs numéricos agregados exitosamente!');
        
        // Verificar que se agregaron correctamente
        const updatedProducts = await Product.find({}, '_id id nombre').limit(5);
        console.log('\n📋 Verificación - Primeros 5 productos:');
        updatedProducts.forEach(product => {
            console.log(`   ID numérico: ${product.id} | MongoDB ID: ${product._id} | Nombre: ${product.nombre}`);
        });
        
    } catch (error) {
        console.error('❌ Error agregando IDs numéricos:', error);
    } finally {
        mongoose.connection.close();
        console.log('\n🔌 Conexión cerrada');
    }
};

// Ejecutar la actualización
connectDB().then(() => {
    addNumericIds();
});
