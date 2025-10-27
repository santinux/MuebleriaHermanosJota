const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/productos';

// Función para probar los endpoints
const testEndpoints = async () => {
    console.log('🧪 Iniciando pruebas de endpoints...\n');

    try {
        // 1. GET /api/productos - Obtener todos los productos
        console.log('1. Probando GET /api/productos...');
        const allProducts = await axios.get(BASE_URL);
        console.log(`✅ Productos obtenidos: ${allProducts.data.count}`);
        console.log(`   Primer producto: ${allProducts.data.data[0]?.nombre || 'N/A'}\n`);

        // 2. POST /api/productos - Crear un nuevo producto
        console.log('2. Probando POST /api/productos...');
        const newProduct = {
            nombre: 'Silla de Prueba',
            descripcion: 'Silla creada para probar la API',
            precio: 15000,
            stock: 5,
            categoria: 'Sillas',
            destacado: false
        };
        
        const createdProduct = await axios.post(BASE_URL, newProduct);
        console.log(`✅ Producto creado: ${createdProduct.data.data.nombre}`);
        console.log(`   ID: ${createdProduct.data.data._id}\n`);

        const productId = createdProduct.data.data._id;

        // 3. GET /api/productos/:id - Obtener producto por ID
        console.log('3. Probando GET /api/productos/:id...');
        const singleProduct = await axios.get(`${BASE_URL}/${productId}`);
        console.log(`✅ Producto obtenido: ${singleProduct.data.data.nombre}\n`);

        // 4. PUT /api/productos/:id - Actualizar producto
        console.log('4. Probando PUT /api/productos/:id...');
        const updatedProduct = await axios.put(`${BASE_URL}/${productId}`, {
            precio: 18000,
            stock: 8
        });
        console.log(`✅ Producto actualizado: ${updatedProduct.data.data.nombre}`);
        console.log(`   Nuevo precio: $${updatedProduct.data.data.precio}\n`);

        // 5. GET /api/productos/featured - Obtener productos destacados
        console.log('5. Probando GET /api/productos/featured...');
        const featuredProducts = await axios.get(`${BASE_URL}/featured`);
        console.log(`✅ Productos destacados: ${featuredProducts.data.count}\n`);

        // 6. GET /api/productos/search - Buscar productos
        console.log('6. Probando GET /api/productos/search...');
        const searchResults = await axios.get(`${BASE_URL}/search?q=silla`);
        console.log(`✅ Resultados de búsqueda: ${searchResults.data.count}\n`);

        // 7. DELETE /api/productos/:id - Eliminar producto
        console.log('7. Probando DELETE /api/productos/:id...');
        const deletedProduct = await axios.delete(`${BASE_URL}/${productId}`);
        console.log(`✅ Producto eliminado: ${deletedProduct.data.data.nombre}\n`);

        console.log('🎉 ¡Todas las pruebas pasaron exitosamente!');

    } catch (error) {
        console.error('❌ Error en las pruebas:', error.response?.data || error.message);
    }
};

// Verificar que el servidor esté corriendo
const checkServer = async () => {
    try {
        await axios.get('http://localhost:3000/api/productos');
        return true;
    } catch (error) {
        console.error('❌ El servidor no está corriendo. Ejecuta: npm run dev');
        return false;
    }
};

// Ejecutar las pruebas
checkServer().then(serverRunning => {
    if (serverRunning) {
        testEndpoints();
    }
});
