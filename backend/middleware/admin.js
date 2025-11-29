// Middleware para verificar que el usuario tenga rol de administrador
const adminMiddleware = (req, res, next) => {
  // El usuario ya debe estar autenticado (req.user viene del authMiddleware)
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'No autenticado'
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Acceso denegado. Se requieren permisos de administrador'
    });
  }

  next();
};

module.exports = adminMiddleware;

