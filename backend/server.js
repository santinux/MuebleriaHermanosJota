const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const productRoutes = require('./routes/productRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(logger);
app.use('/api/productos', productRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});