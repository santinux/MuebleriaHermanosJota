# 🚀 Deploy en Vercel - Mueblería Hermanos Jota

## Guía paso a paso para hacer deploy en Vercel

### 📋 Prerrequisitos

1. **Cuenta en Vercel**: [vercel.com](https://vercel.com)
2. **Cuenta en MongoDB Atlas**: [mongodb.com/atlas](https://mongodb.com/atlas)
3. **GitHub/GitLab/Bitbucket**: Para conectar el repositorio

### 🔧 Configuración del Proyecto

#### 1. Estructura del Proyecto
```
MuebleriaHermanosJota/
├── client/          # Frontend (React + Vite)
├── backend/         # Backend (Express + Node.js)
├── vercel.json      # Configuración de Vercel
└── README.md
```

#### 2. Archivos de Configuración Creados
- ✅ `vercel.json` - Configuración principal de Vercel
- ✅ `client/vercel.json` - Configuración específica del frontend
- ✅ `backend/vercel.json` - Configuración específica del backend
- ✅ `client/env.example` - Variables de entorno del frontend

### 🚀 Pasos para el Deploy

#### Paso 1: Preparar el Repositorio
```bash
# Asegúrate de que todos los cambios estén committeados
git add .
git commit -m "Preparar para deploy en Vercel"
git push origin main
```

#### Paso 2: Conectar con Vercel

1. **Ve a [vercel.com](https://vercel.com)**
2. **Inicia sesión** con tu cuenta de GitHub/GitLab/Bitbucket
3. **Haz clic en "New Project"**
4. **Importa tu repositorio** `MuebleriaHermanosJota`
5. **Vercel detectará automáticamente** que es un proyecto con frontend y backend

#### Paso 3: Configurar Variables de Entorno

En el dashboard de Vercel, ve a **Settings > Environment Variables** y agrega:

```env
# Backend
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/muebleria?retryWrites=true&w=majority
NODE_ENV=production
PORT=3000

# Frontend (opcional)
VITE_API_URL=https://tu-proyecto.vercel.app
```

#### Paso 4: Configurar Build Settings

**Frontend (client):**
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

**Backend (backend):**
- **Framework Preset**: Other
- **Build Command**: `npm install`
- **Output Directory**: (dejar vacío)

#### Paso 5: Deploy

1. **Haz clic en "Deploy"**
2. **Espera** a que se complete el build (5-10 minutos)
3. **¡Listo!** Tu aplicación estará disponible en `https://tu-proyecto.vercel.app`

### 🔗 URLs después del Deploy

- **Frontend**: `https://tu-proyecto.vercel.app`
- **API Backend**: `https://tu-proyecto.vercel.app/api/productos`
- **API Docs**: `https://tu-proyecto.vercel.app/api/productos` (GET)

### 🧪 Probar el Deploy

#### 1. Probar Frontend
- Visita la URL principal
- Verifica que la interfaz se carga correctamente

#### 2. Probar API
```bash
# Obtener todos los productos
curl https://tu-proyecto.vercel.app/api/productos

# Obtener un producto específico
curl https://tu-proyecto.vercel.app/api/productos/ID_DEL_PRODUCTO
```

#### 3. Probar desde el Frontend
- Navega por las páginas
- Verifica que los productos se cargan desde la API
- Prueba la funcionalidad de búsqueda

### 🛠️ Comandos Útiles

#### Deploy Manual
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login en Vercel
vercel login

# Deploy desde la raíz del proyecto
vercel

# Deploy de producción
vercel --prod
```

#### Ver Logs
```bash
# Ver logs del proyecto
vercel logs

# Ver logs en tiempo real
vercel logs --follow
```

### 🔧 Solución de Problemas

#### Error: "Cannot find module"
- Verifica que todas las dependencias estén en `package.json`
- Ejecuta `npm install` localmente para verificar

#### Error: "MongoDB connection failed"
- Verifica que `MONGODB_URI` esté configurada correctamente
- Asegúrate de que la IP esté permitida en MongoDB Atlas

#### Error: "Build failed"
- Revisa los logs de build en Vercel
- Verifica que no haya errores de sintaxis

#### Frontend no carga la API
- Verifica que las rutas estén configuradas correctamente
- Revisa la consola del navegador para errores CORS

### 📊 Monitoreo

- **Vercel Dashboard**: Monitorea el rendimiento y errores
- **MongoDB Atlas**: Monitorea la base de datos
- **Logs**: Revisa los logs en tiempo real

### 🔄 Actualizaciones Futuras

Cada vez que hagas `git push` a la rama principal:
1. Vercel detectará los cambios automáticamente
2. Ejecutará un nuevo build
3. Desplegará la nueva versión

### 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Vercel Dashboard
2. Verifica las variables de entorno
3. Consulta la documentación de Vercel
4. Revisa este README

¡Tu mueblería estará online en minutos! 🎉
