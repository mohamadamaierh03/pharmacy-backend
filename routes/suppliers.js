const express = require('express');
const router = express.Router();
const db = require('../db');
const adminOnly = require('../middleware/adminOnly'); 


router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM suppliers ORDER BY id');
  res.json(result.rows);
});


router.post('/', adminOnly, async (req, res) => {
  const { name, contact, location } = req.body;
  const result = await db.query(
    'INSERT INTO suppliers (name, contact, location) VALUES ($1, $2, $3) RETURNING *',
    [name, contact, location]
  );
  res.status(201).json(result.rows[0]);
});

router.put('/:id', adminOnly, async (req, res) => {
  const { id } = req.params;
  const { name, contact, location } = req.body;
  const result = await db.query(
    'UPDATE suppliers SET name=$1, contact=$2, location=$3 WHERE id=$4 RETURNING *',
    [name, contact, location, id]
  );
  res.json(result.rows[0]);
});

router.delete('/:id', adminOnly, async (req, res) => {
  await db.query('DELETE FROM suppliers WHERE id=$1', [req.params.id]);
  res.sendStatus(204);
});

module.exports = router;
