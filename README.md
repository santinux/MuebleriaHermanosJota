# Mueblería Hermanos Jota - E-commerce Full Stack

## 📋 Información del Proyecto

**Nombre del Proyecto:** Mueblería Hermanos Jota  
**Tipo:** E-commerce Full Stack (React + Node.js/Express)  
**Integrantes:** Equipo Mueblería Hermanos Jota  
**Fecha:** 2025  

## 🎯 Descripción

Este proyecto es una transformación completa de una maqueta HTML/CSS/JavaScript a una aplicación full stack moderna. La aplicación incluye un backend API con Node.js y Express, y un frontend React que consume los datos de la API.

### Características Principales:
- **Backend API REST** con Node.js y Express
- **Frontend React** con arquitectura de componentes
- **Carrito de compras** con estado React
- **Formulario de contacto** controlado
- **Diseño responsivo** y moderno
- **Arquitectura cliente-servidor** completa

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

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd muebleria-hermanos-jota
```

### 2. Instalar Dependencias

#### Opción A: Usando archivos batch (Recomendado para Windows)
```bash
# Ejecutar el archivo batch para instalar todas las dependencias
install-dependencies.bat
```

#### Opción B: Instalación manual
```bash
# Backend
cd backend
npm install

# Frontend
cd ../client
npm install
```

### 3. Solución de Problemas con PowerShell
Si encuentras errores de política de ejecución en PowerShell:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 🏃‍♂️ Ejecutar el Proyecto

### Opción 1: Ejecutar en Terminales Separadas

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
El servidor backend estará disponible en: `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```
El frontend estará disponible en: `http://localhost:3000`

### Opción 2: Ejecutar con Nodemon (Desarrollo)

**Backend con auto-reload:**
```bash
cd backend
npm run dev
```

## 📡 API Endpoints

### Base URL: `http://localhost:3001`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Información de la API |
| GET | `/api/productos` | Obtener todos los productos |
| GET | `/api/productos/:id` | Obtener producto por ID |
| GET | `/api/productos/featured` | Obtener productos destacados |
| GET | `/api/productos/search?q=termino` | Buscar productos |

### Ejemplos de Uso:

```bash
# Obtener todos los productos
curl http://localhost:3001/api/productos

# Obtener producto específico
curl http://localhost:3001/api/productos/1

# Buscar productos
curl http://localhost:3001/api/productos/search?q=mesa
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

### ✅ Backend (API Express)
- [x] Servidor Express con rutas modulares
- [x] Endpoints REST para productos
- [x] Middleware de logging personalizado
- [x] Middleware CORS para frontend
- [x] Manejador de errores centralizado
- [x] Datos de productos en archivo local

### ✅ Frontend (React)
- [x] Arquitectura de componentes reutilizables
- [x] Estado global con useState
- [x] Navegación con renderizado condicional
- [x] Carrito de compras funcional
- [x] Formulario de contacto controlado
- [x] Conexión con API del backend
- [x] Manejo de estados de carga y error
- [x] Diseño responsivo

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
- **CORS** - Middleware para CORS
- **Nodemon** - Auto-reload en desarrollo

### Frontend:
- **React** - Biblioteca de UI
- **React DOM** - Renderizado en el navegador
- **CSS3** - Estilos personalizados
- **Fetch API** - Peticiones HTTP

## 📱 Características de la UI

- **Diseño responsivo** para móviles y desktop
- **Paleta de colores** inspirada en maderas naturales
- **Tipografías** elegantes (Playfair Display + Inter)
- **Animaciones** suaves y transiciones
- **Estados de carga** y manejo de errores
- **Navegación intuitiva** entre secciones

## 🔧 Scripts Disponibles

### Backend:
```bash
npm start          # Iniciar servidor en producción
npm run dev        # Iniciar con nodemon (desarrollo)
```

### Frontend:
```bash
npm start          # Iniciar servidor de desarrollo
npm run build      # Construir para producción
```

## 🚨 Solución de Problemas

### Error de Política de Ejecución (PowerShell):
Si encuentras errores de política de ejecución en PowerShell:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Puerto en Uso:
Si el puerto 3000 o 3001 está en uso:
- Backend: Cambiar `PORT` en `backend/server.js`
- Frontend: React automáticamente sugerirá otro puerto

### CORS Issues:
El backend ya incluye middleware CORS configurado para el frontend.


## 📄 Licencia

Este proyecto es parte de un ejercicio académico y está bajo licencia MIT.

## 👥 Contribuidores

Cuevas Alexis <br>
Delgado Facundo <br>
Guridi Ignacio Javier <br>
Martel Valentina <br>
Fuentes Santino

Equipo Mueblería Hermanos Jota - Sprint 4

---
