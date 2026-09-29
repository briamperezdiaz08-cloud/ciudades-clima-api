import express from 'express';
import pool from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import ciudadesRoutes from './routes/ciudadesRoutes.js';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/ciudades', ciudadesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});