const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No se proporcionó un token de autenticación'
      });
    }

    // Extraer el token (remover "Bearer ")
    let token = authHeader.substring(7);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no válido'
      });
    }

    // Limpiar el token (remover espacios y comillas si las tiene)
    token = token.trim().replace(/^["']|["']$/g, '');

    // Verificar y decodificar el token
    const jwtSecret = process.env.JWT_SECRET || '5e60aa035f94b0eb7de4638e0a37b61291239991c451a7a3c47ab5bdef41ca76';
    const decoded = jwt.verify(token, jwtSecret);

    // Buscar el usuario en la base de datos
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Agregar el usuario al request para uso en las rutas
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      console.error('Error JWT:', error.message);
      console.error('Token recibido (primeros 20 chars):', token ? token.substring(0, 20) : 'null');
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }
    if (error.name === 'TokenExpiredError') {
      console.error('Token expirado:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Token expirado'
      });
    }
    
    console.error('Error en middleware de autenticación:', error);
    console.error('Stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Error en la autenticación'
    });
  }
};

module.exports = authMiddleware;

