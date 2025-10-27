const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // La cadena de conexión debe estar en la variable de entorno MONGODB_URI
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/muebleria';
        
        const conn = await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
