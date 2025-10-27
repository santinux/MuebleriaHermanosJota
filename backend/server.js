require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const productRoutes = require('./routes/productRoutes');
const contactRoutes = require('./routes/contactRoutes');
const { loadContactsFromFile } = require('./controllers/contactController');
const connectDB = require('./config/database');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

// Middleware para resolver rutas
app.use('/api/productos', productRoutes);
app.use('/api', contactRoutes);

// Middleware para rutas no encontradas (404)
app.use((req, res, next) => {
    const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
    error.status = 404;
    next(error);
});

// Middleware para manejo de errores centralizado
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        message: err.message || 'Ha ocurrido un error en el servidor'
    });
});

// Conectar a la base de datos solo si no estamos en Vercel
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
    connectDB();
    // Cargar datos al iniciar el servidor solo en desarrollo
    loadContactsFromFile();
}

// Para Vercel, no necesitamos app.listen()
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
}

// Exportar la app para Vercel
module.exports = app;
