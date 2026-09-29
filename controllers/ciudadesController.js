import pool from '../config/db.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const agregarCiudad = async (req, res) => {
  const { nombre_ciudad, pais } = req.body;
  const usuario_id = req.usuario.id;

  try {
    const resultado = await pool.query(
      'INSERT INTO ciudades_favoritas (usuario_id, nombre_ciudad, pais) VALUES ($1, $2, $3) RETURNING *',
      [usuario_id, nombre_ciudad, pais]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al agregar ciudad', error: error.message });
  }
};

export const listarCiudades = async (req, res) => {
  const usuario_id = req.usuario.id;

  try {
    const resultado = await pool.query(
      'SELECT * FROM ciudades_favoritas WHERE usuario_id = $1',
      [usuario_id]
    );

    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar ciudades', error: error.message });
  }
};

export const eliminarCiudad = async (req, res) => {
  const { id } = req.params;
  const usuario_id = req.usuario.id;

  try {
    const resultado = await pool.query(
      'DELETE FROM ciudades_favoritas WHERE id = $1 AND usuario_id = $2 RETURNING *',
      [id, usuario_id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Ciudad no encontrada' });
    }

    res.json({ mensaje: 'Ciudad eliminada', ciudad: resultado.rows[0] });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar ciudad', error: error.message });
  }
};

export const obtenerClima = async (req, res) => {
  const { id } = req.params;
  const usuario_id = req.usuario.id;

  try {
    const resultado = await pool.query(
      'SELECT * FROM ciudades_favoritas WHERE id = $1 AND usuario_id = $2',
      [id, usuario_id]
    );

    const ciudad = resultado.rows[0];

    if (!ciudad) {
      return res.status(404).json({ mensaje: 'Ciudad no encontrada' });
    }

    const respuestaClima = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: `${ciudad.nombre_ciudad},${ciudad.pais}`,
        appid: process.env.OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'es',
      },
    });

    const datosClima = respuestaClima.data;

    res.json({
      ciudad: ciudad.nombre_ciudad,
      pais: ciudad.pais,
      temperatura: datosClima.main.temp,
      sensacion_termica: datosClima.main.feels_like,
      descripcion: datosClima.weather[0].description,
      humedad: datosClima.main.humidity,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al consultar el clima', error: error.message });
  }
};