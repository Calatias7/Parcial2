import { Router } from 'express';
import { pool } from '../db.js';

const router = Router();

// 3) POST /ordenes  (body: cliente_id, platillo_nombre, notas)
router.post('/', async (req, res) => {
  try {
    const { cliente_id, platillo_nombre, notas } = req.body;
    if (!cliente_id || !platillo_nombre) return res.status(400).json({ error: 'cliente_id y platillo_nombre requeridos' });
    const inserted = await pool.query(
      'INSERT INTO ordenes(cliente_id, platillo_nombre, notas) VALUES ($1,$2,$3) RETURNING *',
      [cliente_id, platillo_nombre, notas ?? null]
    );
    res.status(201).json(inserted.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// 4) GET /ordenes/cliente/:id
router.get('/cliente/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const q = await pool.query('SELECT * FROM ordenes WHERE cliente_id=$1 ORDER BY creado DESC', [id]);
    res.json(q.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// 5) PUT /ordenes/:id/estado  -> ciclo pending -> preparing -> delivered
router.put('/:id/estado', async (req, res) => {
  try {
    const id = Number(req.params.id);
    // fetch current
    const cur = await pool.query('SELECT estado FROM ordenes WHERE id=$1', [id]);
    if (cur.rowCount === 0) return res.status(404).json({ error: 'Orden no encontrada' });
    const estado = cur.rows[0].estado;
    const next = estado === 'pending' ? 'preparing' : (estado === 'preparing' ? 'delivered' : 'delivered');
    const up = await pool.query('UPDATE ordenes SET estado=$1 WHERE id=$2 RETURNING *', [next, id]);
    res.json(up.rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

export default router;
