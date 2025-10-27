# Configuración de Base de Datos - Mueblería Hermanos Jota

## Requisitos del Sprint 5 y 6

Este documento describe cómo configurar la base de datos MongoDB Atlas para el proyecto de la mueblería.

## 1. Configuración de MongoDB Atlas

### Paso 1: Crear cuenta en MongoDB Atlas
1. Ve a [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crea una cuenta gratuita
3. Crea un nuevo cluster (opción gratuita M0)

### Paso 2: Configurar acceso a la base de datos
1. En el dashboard de Atlas, ve a "Database Access"
2. Crea un nuevo usuario con permisos de lectura y escritura
3. Anota el nombre de usuario y contraseña

### Paso 3: Configurar red
1. Ve a "Network Access"
2. Agrega tu IP actual o usa 0.0.0.0/0 para permitir acceso desde cualquier IP (solo para desarrollo)

### Paso 4: Obtener cadena de conexión
1. Ve a "Database" y haz clic en "Connect"
2. Selecciona "Connect your application"
3. Copia la cadena de conexión

## 2. Configuración del proyecto

### Paso 1: Crear archivo .env
Crea un archivo `.env` en la carpeta `backend` con el siguiente contenido:

```env
# Configuración de MongoDB Atlas
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/muebleria?retryWrites=true&w=majority

# Puerto del servidor
PORT=3000
```

**Importante:** Reemplaza `usuario`, `password` y `cluster` con tus datos reales de MongoDB Atlas.

### Paso 2: Instalar dependencias
```bash
cd backend
npm install
```

### Paso 3: Migrar datos existentes
```bash
node scripts/migrateProducts.js
```

Este script migrará los productos existentes del archivo `data/products.js` a la base de datos MongoDB.

## 3. Endpoints de la API

### Productos
- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/:id` - Obtener un producto por ID
- `GET /api/productos/featured` - Obtener productos destacados
- `GET /api/productos/search?q=termino` - Buscar productos
- `POST /api/productos` - Crear un nuevo producto
- `PUT /api/productos/:id` - Actualizar un producto existente
- `DELETE /api/productos/:id` - Eliminar un producto

### Ejemplo de creación de producto (POST)
```json
{
  "nombre": "Mesa de Centro Moderna",
  "descripcion": "Mesa de centro con diseño moderno y elegante",
  "precio": 25000,
  "stock": 10,
  "imagenUrl": "https://ejemplo.com/imagen.jpg",
  "categoria": "Mesas",
  "destacado": true
}
```

## 4. Estructura del modelo Product

```javascript
{
  nombre: String (requerido),
  descripcion: String,
  precio: Number (requerido),
  stock: Number (default: 0),
  imagenUrl: String,
  categoria: String,
  destacado: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## 5. Iniciar el servidor

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## 6. Verificación

Para verificar que todo funciona correctamente:

1. El servidor debe mostrar: "MongoDB conectado: [host]"
2. Puedes probar los endpoints con Postman o curl
3. Los datos deben persistir entre reinicios del servidor

## Notas importantes

- El archivo `.env` NO debe subirse a Git (está en .gitignore)
- Para producción, usa variables de entorno del servidor
- La base de datos gratuita de Atlas tiene limitaciones de almacenamiento (512MB)
- Los índices están configurados para mejorar el rendimiento de las búsquedas
