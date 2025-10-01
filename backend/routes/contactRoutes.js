const express = require('express');
const router = express.Router();
const {
  recibirContacto,
  obtenerContactos
} = require('../controllers/contactController');

router.post('/contacto', recibirContacto);
router.get('/contactos', obtenerContactos);

module.exports = router;
