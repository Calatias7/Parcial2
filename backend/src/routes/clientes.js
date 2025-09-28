import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

// 1) POST /clientes/registrar
router.post('/registrar', async (req, res) => {
  try {
    const { nombre, email, telefono } = req.body;
    if (!nombre || !email || !telefono) {
      return res.status(400).json({ error: 'nombre, email y telefono son requeridos' });
    }
    const exists = await pool.query('SELECT 1 FROM clientes WHERE email=$1 OR telefono=$2', [email, telefono]);
    if (exists.rowCount > 0) {
      return res.status(409).json({ error: 'Email o teléfono ya registrados' });
    }
    const inserted = await pool.query(
      'INSERT INTO clientes(nombre, email, telefono) VALUES ($1,$2,$3) RETURNING id, nombre, email, telefono',
      [nombre, email, telefono]
    );
    res.status(201).json(inserted.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// 2) POST /clientes/login (email + telefono)
router.post('/login', async (req, res) => {
  try {
    const { email, telefono } = req.body;
    if (!email || !telefono) return res.status(400).json({ error: 'email y telefono requeridos' });
    const q = await pool.query('SELECT id, nombre, email, telefono FROM clientes WHERE email=$1 AND telefono=$2', [email, telefono]);
    if (q.rowCount === 0) return res.status(401).json({ error: 'Credenciales inválidas' });
    // simple sessionless auth: return client object
    res.json(q.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;
