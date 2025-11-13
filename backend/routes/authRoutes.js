const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// Ruta pública: Registro
router.post('/registro', register);

// Ruta pública: Login
router.post('/login', login);

// Ruta protegida: Obtener perfil del usuario autenticado
router.get('/perfil', authMiddleware, getProfile);

module.exports = router;

