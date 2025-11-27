const express = require('express');
const router = express.Router();
const {
  recibirContacto,
  obtenerContactos,
  actualizarContacto,
  eliminarContacto
} = require('../controllers/contactController');

router.post('/contacto', recibirContacto);
router.get('/contactos', obtenerContactos);
router.put('/contactos/:id', actualizarContacto);
router.delete('/contactos/:id', eliminarContacto);

module.exports = router;
