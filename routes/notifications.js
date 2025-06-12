const express = require('express');
const router = express.Router();
const db = require('../db');
const adminOnly = require('../middleware/adminOnly'); 


router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM notifications ORDER BY date_sent DESC');
  res.json(result.rows);
});


router.post('/', adminOnly, async (req, res) => {
  const { title, message, recipient } = req.body;
  const result = await db.query(
    'INSERT INTO notifications (title, message, recipient) VALUES ($1, $2, $3) RETURNING *',
    [title, message, recipient]
  );
  res.status(201).json(result.rows[0]);
});

router.put('/:id', adminOnly, async (req, res) => {
  const { id } = req.params;
  const { title, message, recipient } = req.body;
  const result = await db.query(
    'UPDATE notifications SET title=$1, message=$2, recipient=$3 WHERE id=$4 RETURNING *',
    [title, message, recipient, id]
  );
  res.json(result.rows[0]);
});

router.delete('/:id', adminOnly, async (req, res) => {
  await db.query('DELETE FROM notifications WHERE id=$1', [req.params.id]);
  res.sendStatus(204);
});

module.exports = router;
