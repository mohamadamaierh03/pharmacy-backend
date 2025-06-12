const express = require('express');
const router = express.Router();
const db = require('../db');
const adminOnly = require('../middleware/adminOnly'); 


router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM inventory ORDER BY id');
  res.json(result.rows);
});


router.post('/', adminOnly, async (req, res) => {
  const { item_name, quantity, price, supplier } = req.body;
  const result = await db.query(
    'INSERT INTO inventory (item_name, quantity, price, supplier) VALUES ($1, $2, $3, $4) RETURNING *',
    [item_name, quantity, price, supplier]
  );
  res.status(201).json(result.rows[0]);
});

router.put('/:id', adminOnly, async (req, res) => {
  const { id } = req.params;
  const { item_name, quantity, price, supplier } = req.body;
  const result = await db.query(
    'UPDATE inventory SET item_name=$1, quantity=$2, price=$3, supplier=$4 WHERE id=$5 RETURNING *',
    [item_name, quantity, price, supplier, id]
  );
  res.json(result.rows[0]);
});

router.delete('/:id', adminOnly, async (req, res) => {
  await db.query('DELETE FROM inventory WHERE id=$1', [req.params.id]);
  res.sendStatus(204);
});

module.exports = router;
