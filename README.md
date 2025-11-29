# Mueblería Hermanos Jota - E-commerce Full Stack

## 📋 Información del Proyecto

**Nombre del Proyecto:** Mueblería Hermanos Jota  
**Tipo:** E-commerce Full Stack (React + Node.js/Express)  
**Integrantes:** Equipo Mueblería Hermanos Jota  
**Fecha:** 2025  

## 🌐 Sitios Desplegados

### 🎨 Frontend (Vercel)
**URL:** [https://muebleriahermanosjota.vercel.app](https://muebleriahermanosjota.vercel.app)

### ⚙️ Backend (Render)
**URL:** [https://muebleriahermanosjota.onrender.com](https://muebleriahermanosjota.onrender.com)

### 🔍 Health Check del Backend
- **Endpoint:** [/api/health](https://muebleriahermanosjota.onrender.com/api/health)

## 🎯 Descripción

Este proyecto es una transformación completa de una maqueta HTML/CSS/JavaScript a una aplicación full stack moderna. La aplicación incluye un backend API con Node.js y Express conectado a MongoDB Atlas, y un frontend React que consume los datos de la API.

### Características Principales:
- **Backend API REST** con Node.js y Express
- **Base de datos MongoDB Atlas** para persistencia de datos
- **Frontend React** con arquitectura de componentes
- **Carrito de compras** con estado React
- **Formulario de contacto** controlado
- **Diseño responsivo** y moderno
- **Arquitectura cliente-servidor** completa
- **Despliegue en producción** (Vercel + Render)

## 🏗️ Arquitectura del Proyecto

El proyecto está organizado como un **monorepo** con dos carpetas principales:

```
muebleria-hermanos-jota/
├── backend/                 # API Node.js/Express
│   ├── controllers/         # Controladores de la API
│   ├── data/               # Datos de productos
│   ├── middleware/         # Middlewares personalizados
│   ├── routes/             # Rutas de la API
│   ├── package.json        # Dependencias del backend
│   └── server.js           # Servidor principal
├── client/                 # Aplicación React
│   ├── public/             # Archivos públicos
│   ├── src/                # Código fuente React
│   │   ├── components/     # Componentes React
│   │   ├── styles/         # Estilos CSS
│   │   ├── App.js          # Componente principal
│   │   └── index.js        # Punto de entrada
│   └── package.json        # Dependencias del frontend
└── README.md               # Este archivo
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm (incluido con Node.js)
- MongoDB Atlas (cuenta gratuita)

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd muebleria-hermanos-jota
```

### 2. Instalar Dependencias

#### Instalación manual
```bash
# Backend
cd backend
npm install

# Frontend
cd client
npm install
```

### 3. Configurar Variables de Entorno

#### Backend
Crea un archivo `.env` en la carpeta `backend` con el siguiente contenido:

```env
# Configuración de MongoDB Atlas
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/muebleria?retryWrites=true&w=majority

# Puerto del servidor
PORT=3000

# Entorno
NODE_ENV=development
```

**Importante:** Reemplaza `usuario`, `password` y `cluster` con tus credenciales reales de MongoDB Atlas.

📝 **¿Cómo obtener la cadena de conexión de MongoDB Atlas?**
1. Ve a [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Inicia sesión en tu cuenta
3. Ve a "Database" → "Connect"
4. Selecciona "Connect your application"
5. Copia la cadena de conexión y reemplaza `<password>` con tu contraseña

#### Frontend
Crea un archivo `.env` en la carpeta `client` con el siguiente contenido:

```env
# URL del backend (en desarrollo local)
VITE_API_URL=http://localhost:3000
```

**Nota:** En producción (Vercel), esta variable se configura automáticamente a través de `vercel.json`.

### 4. Configurar MongoDB Atlas

Para que el backend pueda conectarse a MongoDB Atlas, necesitas:

1. **Crear un usuario de base de datos:**
   - Ve a "Database Access" en MongoDB Atlas
   - Haz clic en "Add New Database User"
   - Crea un usuario con permisos de lectura y escritura

2. **Configurar Network Access:**
   - Ve a "Network Access"
   - Agrega `0.0.0.0/0` para permitir conexiones desde cualquier IP (solo para desarrollo)
   - O agrega tu IP actual para mayor seguridad

3. **Obtener la cadena de conexión:**
   - Ve a "Database" → "Connect"
   - Selecciona "Connect your application"
   - Copia la cadena de conexión y úsala en tu `.env`

### 5. Migrar Datos a la Base de Datos

Una vez configurada la conexión a MongoDB Atlas, ejecuta el script de migración:

```bash
cd backend
npm run migrate
```

Este script migrará los productos existentes del archivo `data/products.js` a la base de datos MongoDB.

## 🏃‍♂️ Ejecutar el Proyecto

### Desarrollo Local

**⚠️ Importante:** Asegúrate de tener configurados los archivos `.env` en ambas carpetas antes de ejecutar los servidores.

#### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```
El servidor backend estará disponible en: `http://localhost:3000`

Deberías ver:
```
MongoDB conectado: [tu-cluster]
Servidor corriendo en puerto 3000
Entorno: development
```

#### Terminal 2 - Frontend:
```bash
cd client
npm run dev
```
El frontend estará disponible en: `http://localhost:5173`

El navegador se abrirá automáticamente y verás la aplicación funcionando.

**💡 Tip:** Si ves errores de conexión, verifica que:
1. MongoDB Atlas tenga tu IP en la whitelist
2. Las credenciales en `.env` sean correctas
3. Ambos servidores estén corriendo

## 🔐 Autenticación y Usuarios

### Cuenta de Administrador de Prueba

Para acceder a las funcionalidades de administrador (crear, editar y eliminar productos), puedes usar la siguiente cuenta de prueba:

**Email:** `test@gmail.com`  
**Contraseña:** `test123`  
**Rol:** Administrador

### Funcionalidades de Administrador

Con esta cuenta podrás:
- ✅ Crear nuevos productos
- ✅ Editar productos existentes
- ✅ Eliminar productos
- ✅ Ver y gestionar pedidos
- ✅ Acceder a estadísticas de pedidos

### Cómo Iniciar Sesión

1. Ve a la página de inicio de sesión: `/login`
2. Ingresa las credenciales:
   - Email: `test@gmail.com`
   - Contraseña: `test123`
3. Una vez autenticado, podrás acceder a:
   - `/admin/crear-producto` - Crear nuevo producto
   - `/admin/editar-producto/:id` - Editar producto existente
   - `/perfil` - Ver tu perfil y gestionar pedidos

### Registro de Nuevos Usuarios

También puedes registrar nuevos usuarios desde `/registro`. Los usuarios nuevos tendrán rol de `client` por defecto y podrán:
- Ver productos
- Agregar productos al carrito
- Realizar pedidos
- Ver su perfil y pedidos

## 📡 API Endpoints

### Base URL Local: `http://localhost:3000`  
### Base URL Producción: `https://muebleriahermanosjota.onrender.com`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/health` | Health check del servidor |
| GET | `/api/productos` | Obtener todos los productos |
| GET | `/api/productos/:id` | Obtener producto por ID |
| GET | `/api/productos/featured` | Obtener productos destacados |
| GET | `/api/productos/search?q=termino` | Buscar productos |
| POST | `/api/productos` | Crear un nuevo producto (requiere autenticación + rol admin) |
| PUT | `/api/productos/:id` | Actualizar un producto (requiere autenticación + rol admin) |
| DELETE | `/api/productos/:id` | Eliminar un producto (requiere autenticación + rol admin) |
| POST | `/api/auth/registro` | Registrar nuevo usuario |
| POST | `/api/auth/login` | Iniciar sesión |
| GET | `/api/auth/perfil` | Obtener perfil del usuario (requiere autenticación) |
| POST | `/api/pedidos` | Crear un nuevo pedido (requiere autenticación) |
| GET | `/api/pedidos` | Obtener pedidos del usuario (requiere autenticación) |
| GET | `/api/pedidos/:id` | Obtener pedido específico (requiere autenticación) |

### Ejemplos de Uso:

```bash
# Health check
curl http://localhost:3000/api/health

# Obtener todos los productos
curl http://localhost:3000/api/productos

# Obtener producto específico por ID numérico
curl http://localhost:3000/api/productos/1

# Buscar productos
curl http://localhost:3000/api/productos/search?q=mesa

# Crear un nuevo producto (requiere autenticación + rol admin)
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_JWT" \
  -d '{
    "nombre": "Mesa de Centro",
    "descripcion": "Mesa moderna",
    "precio": 25000,
    "stock": 10,
    "categoria": "mesas"
  }'

# Iniciar sesión
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@gmail.com",
    "password": "test123"
  }'

# Registrar nuevo usuario
curl -X POST http://localhost:3000/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123"
  }'
```

## 🎨 Componentes React

### Estructura de Componentes:
- **App.js** - Componente principal con estado global
- **Navbar** - Navegación con contador de carrito
- **Footer** - Pie de página
- **Hero** - Sección principal de la página de inicio
- **ProductList** - Lista de productos
- **ProductCard** - Tarjeta individual de producto
- **ProductDetail** - Vista detallada de producto
- **ContactForm** - Formulario de contacto controlado

### Características de los Componentes:
- **Estado React** con `useState`
- **Props** para comunicación entre componentes
- **Eventos** para interacción del usuario
- **Renderizado condicional** para diferentes vistas
- **Fetch API** para conectar con el backend

## 🛒 Funcionalidades Implementadas

### ✅ Backend (API Express + MongoDB)
- [x] Servidor Express con rutas modulares
- [x] Conexión a MongoDB Atlas
- [x] Modelo Mongoose para Productos
- [x] Endpoints REST completos (CRUD)
- [x] Middleware de logging personalizado
- [x] Middleware CORS configurado para producción
- [x] Manejador de errores centralizado
- [x] Health check endpoint
- [x] Deploy en Render
- [x] Base de datos MongoDB con persistencia

### ✅ Frontend (React + Vite)
- [x] Arquitectura de componentes reutilizables
- [x] Estado global con Context API
- [x] Navegación con React Router
- [x] Carrito de compras funcional
- [x] Formulario de contacto controlado
- [x] Conexión con API del backend
- [x] Manejo de estados de carga y error
- [x] Diseño responsivo
- [x] Normalización de URLs de imágenes
- [x] Deploy en Vercel
- [x] Configuración SPA para producción

## 🎯 Objetivos de Aprendizaje Cumplidos

### Backend (Node.js/Express):
- ✅ Construcción de servidor web y API REST
- ✅ Definición de rutas modulares con express.Router
- ✅ Implementación de middlewares personalizados
- ✅ Manejo de errores y rutas no encontradas

### Frontend (React):
- ✅ Arquitectura de componentes reutilizables
- ✅ Manejo de estado con useState
- ✅ Comunicación entre componentes con props
- ✅ Manejo de eventos de React
- ✅ Renderizado dinámico con .map()
- ✅ Renderizado condicional
- ✅ Conexión con API usando fetch
- ✅ Manejo del ciclo de vida de peticiones

## 🛠️ Tecnologías Utilizadas

### Backend:
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB Atlas** - Base de datos en la nube
- **Mongoose** - ODM para MongoDB
- **CORS** - Middleware para CORS
- **dotenv** - Variables de entorno
- **Nodemon** - Auto-reload en desarrollo

### Frontend:
- **React** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **React Router** - Navegación SPA
- **Context API** - Estado global
- **CSS3** - Estilos personalizados
- **Fetch API** - Peticiones HTTP

### Deployment:
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Database hosting

## 📱 Características de la UI

- **Diseño responsivo** para móviles y desktop
- **Paleta de colores** inspirada en maderas naturales
- **Tipografías** elegantes (Playfair Display + Inter)
- **Animaciones** suaves y transiciones
- **Estados de carga** y manejo de errores
- **Navegación intuitiva** entre secciones

## 📚 Documentación Adicional

Para más información sobre configuración específica, consulta:

- **[DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)** - Guía completa de deploy en Vercel
- **[DEPLOY_RENDER.md](./DEPLOY_RENDER.md)** - Guía completa de deploy en Render
- **[CONFIGURACION_RENDER.md](./CONFIGURACION_RENDER.md)** - Configuración detallada de Render
- **[backend/README_DATABASE.md](./backend/README_DATABASE.md)** - Configuración de MongoDB Atlas

## 🔧 Scripts Disponibles

### Backend:
```bash
npm start          # Ejecutar en producción
npm run dev        # Ejecutar en modo desarrollo (con nodemon)
npm run migrate    # Migrar productos a MongoDB
npm run test:endpoints  # Probar endpoints de la API
```

### Frontend:
```bash
npm run dev        # Ejecutar servidor de desarrollo
npm run build      # Construir para producción
npm run preview    # Previsualizar build de producción
```

## ⚠️ Troubleshooting

### Problemas Comunes:

**1. Error de conexión a MongoDB:**
- Verifica que tu IP esté en la whitelist de MongoDB Atlas
- Confirma que las credenciales en `.env` sean correctas
- Asegúrate de que la cadena de conexión esté bien formada

**2. Frontend no conecta con el backend:**
- Verifica que `VITE_API_URL` esté configurado en `client/.env`
- Asegúrate de que ambos servidores estén corriendo
- Revisa la consola del navegador para errores de CORS

**3. Imágenes no se muestran:**
- Verifica que las imágenes estén en `client/public/img/`
- Confirma que las rutas en la base de datos sean correctas
- En producción, verifica la configuración de Vercel

**4. Cambios no se reflejan:**
- Detén y reinicia los servidores
- En producción, verifica que el deploy se haya completado
- Limpia la caché del navegador

## 🧪 Testing

Para verificar que todo funciona correctamente:

```bash
# Backend health check
curl http://localhost:3000/api/health

# Obtener productos
curl http://localhost:3000/api/productos

# Buscar productos
curl http://localhost:3000/api/productos/search?q=mesa
```


## 👥 Contribuidores

Cuevas Alexis <br>
Delgado Facundo <br>
Guridi Ignacio Javier <br>
Martel Valentina <br>
Fuentes Santino

Equipo Mueblería Hermanos Jota - Sprint 5 & 6

---

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos.
