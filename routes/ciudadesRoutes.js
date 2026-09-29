import express from 'express';
import verificarToken from '../middlewares/verificarToken.js';
import { agregarCiudad, listarCiudades, eliminarCiudad, obtenerClima } from '../controllers/ciudadesController.js';

const router = express.Router();

router.post('/', verificarToken, agregarCiudad);
router.get('/', verificarToken, listarCiudades);
router.delete('/:id', verificarToken, eliminarCiudad);
router.get('/:id/clima', verificarToken, obtenerClima);

export default router;