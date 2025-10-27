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

// Configurar CORS para Render
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://muebleriahermanosjota.vercel.app', 'https://*.vercel.app', 'https://*.render.com']
        : true,
    credentials: true
}));

app.use(express.json());
app.use(logger);

// Middleware para resolver rutas
app.use('/api/productos', productRoutes);
app.use('/api', contactRoutes);

// Health check endpoint para Render
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime()
    });
});

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

// Conectar a la base de datos
connectDB();

// Cargar datos al iniciar el servidor solo en desarrollo
if (process.env.NODE_ENV !== 'production') {
    loadContactsFromFile();
}

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;