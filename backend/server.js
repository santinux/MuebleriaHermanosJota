const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const productRoutes = require("./routes/productRoutes");
const requestLogger = require("./middleware/logger");

app.use(cors());
app.use("/api/productos", productRoutes);
app.use(requestLogger);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
