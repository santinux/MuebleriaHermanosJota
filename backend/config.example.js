// Archivo de ejemplo para configuración de base de datos
// Copia este archivo como .env en la raíz del backend

module.exports = {
    // Configuración de MongoDB Atlas
    MONGODB_URI: 'mongodb+srv://usuario:password@cluster.mongodb.net/muebleria?retryWrites=true&w=majority',
    
    // Puerto del servidor
    PORT: 3000
};

// Instrucciones:
// 1. Crea un archivo .env en la carpeta backend
// 2. Copia el contenido de arriba al archivo .env
// 3. Reemplaza 'usuario', 'password' y 'cluster' con tus datos reales de MongoDB Atlas
// 4. Ejecuta: npm run migrate (para migrar datos existentes)
// 5. Ejecuta: npm run dev (para iniciar el servidor)
