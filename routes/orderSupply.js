const express = require('express');
const router = express.Router();
const db = require('../db');
const adminOnly = require('../middleware/adminOnly');


router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM order_supply ORDER BY id DESC');
  res.json(result.rows);
});

router.post('/', adminOnly, async (req, res) => {
  const { supplier, item, quantity } = req.body;
  const result = await db.query(
    'INSERT INTO order_supply (supplier, item, quantity) VALUES ($1, $2, $3) RETURNING *',
    [supplier, item, quantity]
  );
  res.status(201).json(result.rows[0]);
});

router.put('/:id', adminOnly, async (req, res) => {
  const { id } = req.params;
  const { supplier, item, quantity } = req.body;
  const result = await db.query(
    'UPDATE order_supply SET supplier=$1, item=$2, quantity=$3 WHERE id=$4 RETURNING *',
    [supplier, item, quantity, id]
  );
  res.json(result.rows[0]);
});

router.delete('/:id', adminOnly, async (req, res) => {
  await db.query('DELETE FROM order_supply WHERE id=$1', [req.params.id]);
  res.sendStatus(204);
});

module.exports = router;
