// Archivo principal para Vercel API Routes
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('../middleware/logger');
const productRoutes = require('../routes/productRoutes');
const contactRoutes = require('../routes/contactRoutes');
const { loadContactsFromFile } = require('../controllers/contactController');
const connectDB = require('../config/database');
const app = express();

// Configurar CORS para Vercel
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://muebleria-hermanos-jota.vercel.app', 'https://*.vercel.app']
        : true,
    credentials: true
}));

app.use(express.json());
app.use(logger);

// Conectar a la base de datos
connectDB();

// Cargar datos al iniciar (solo en desarrollo)
if (process.env.NODE_ENV !== 'production') {
    loadContactsFromFile();
}

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

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

module.exports = app;
