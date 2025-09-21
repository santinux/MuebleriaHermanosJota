const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const productRoutes = require('./routes/productRoutes');

app.use(cors());
app.use('/api/productos', productRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});