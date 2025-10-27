# 🚀 Deploy del Backend en Render - Mueblería Hermanos Jota

## 📋 Prerrequisitos

1. **Cuenta en Render**: [render.com](https://render.com)
2. **Cuenta en MongoDB Atlas**: [mongodb.com/atlas](https://mongodb.com/atlas)
3. **Repositorio en GitHub**: Para conectar con Render

## 🔧 Configuración del Proyecto

### Archivos Creados/Modificados
- ✅ `backend/render.yaml` - Configuración de Render
- ✅ `backend/package.json` - Actualizado con engines y metadatos
- ✅ `backend/server.js` - Optimizado para Render
- ✅ `backend/config/database.js` - Configuración de MongoDB

## 🚀 Pasos para Deploy en Render

### Paso 1: Preparar el Repositorio
```bash
# Asegúrate de que todos los cambios estén committeados
git add .
git commit -m "Preparar backend para deploy en Render"
git push origin main
```

### Paso 2: Crear Servicio en Render

1. **Ve a [render.com](https://render.com)**
2. **Inicia sesión** con tu cuenta de GitHub
3. **Haz clic en "New +"** → **"Web Service"**
4. **Conecta tu repositorio** `MuebleriaHermanosJota`
5. **Configura el servicio:**

#### Configuración Básica
- **Name**: `muebleria-backend`
- **Environment**: `Node`
- **Region**: `Oregon (US West)`
- **Branch**: `main`
- **Root Directory**: `backend`

#### Build & Deploy
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Paso 3: Configurar Variables de Entorno

En la sección **"Environment Variables"** de Render, agrega:

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/muebleria?retryWrites=true&w=majority
```

**Importante**: 
- Reemplaza `usuario`, `password` y `cluster` con tus datos reales de MongoDB Atlas
- La variable `MONGODB_URI` debe estar configurada antes del deploy

### Paso 4: Configurar Health Check

- **Health Check Path**: `/api/health`
- **Health Check Timeout**: `300` segundos

### Paso 5: Deploy

1. **Haz clic en "Create Web Service"**
2. **Espera** a que se complete el build (5-10 minutos)
3. **¡Listo!** Tu API estará disponible en `https://muebleria-backend.onrender.com`

## 🔗 URLs después del Deploy

- **API Base**: `https://muebleria-backend.onrender.com`
- **Productos**: `https://muebleria-backend.onrender.com/api/productos`
- **Health Check**: `https://muebleria-backend.onrender.com/api/health`

## 🧪 Probar el Deploy

### 1. Health Check
```bash
curl https://muebleria-backend.onrender.com/api/health
```

### 2. Obtener Productos
```bash
curl https://muebleria-backend.onrender.com/api/productos
```

### 3. Productos Destacados
```bash
curl https://muebleria-backend.onrender.com/api/productos/featured
```

## 🔧 Configuración del Frontend

Una vez que el backend esté desplegado, actualiza el frontend:

### 1. Actualizar Variables de Entorno
En `client/.env`:
```env
VITE_API_URL=https://muebleria-backend.onrender.com
```

### 2. Actualizar Vercel
En el dashboard de Vercel, actualiza la variable de entorno:
```
VITE_API_URL=https://muebleria-backend.onrender.com
```

## 📊 Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Todos los productos |
| GET | `/api/productos/:id` | Producto por ID |
| GET | `/api/productos/featured` | Productos destacados |
| GET | `/api/productos/search?q=termino` | Buscar productos |
| POST | `/api/productos` | Crear producto |
| PUT | `/api/productos/:id` | Actualizar producto |
| DELETE | `/api/productos/:id` | Eliminar producto |
| GET | `/api/health` | Estado del servidor |

## 🔄 Actualizaciones Futuras

Cada vez que hagas `git push` a la rama principal:
1. Render detectará los cambios automáticamente
2. Ejecutará un nuevo build
3. Desplegará la nueva versión

## 🛠️ Comandos Útiles

### Ver Logs
- En el dashboard de Render, ve a "Logs"
- Revisa los logs en tiempo real

### Reiniciar Servicio
- En el dashboard de Render, haz clic en "Manual Deploy"

### Variables de Entorno
- Ve a "Environment" en el dashboard
- Agrega o modifica variables según necesites

## 🔧 Solución de Problemas

### Error: "Cannot connect to MongoDB"
- Verifica que `MONGODB_URI` esté configurada correctamente
- Asegúrate de que la IP esté permitida en MongoDB Atlas

### Error: "Build failed"
- Revisa los logs de build en Render
- Verifica que no haya errores de sintaxis

### Error: "Service unavailable"
- Verifica que el health check esté funcionando
- Revisa los logs del servicio

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Render Dashboard
2. Verifica las variables de entorno
3. Consulta la documentación de Render
4. Revisa este README

¡Tu backend estará online en minutos! 🎉
