const express = require('express');
const router = express.Router();
const db = require('../db');
const adminOnly = require('../middleware/adminOnly'); 

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM patients ORDER BY id');
  res.json(result.rows);
});

router.post('/', adminOnly, async (req, res) => {
  const { full_name, dob, contact, address } = req.body;
  const result = await db.query(
    'INSERT INTO patients (full_name, dob, contact, address) VALUES ($1, $2, $3, $4) RETURNING *',
    [full_name, dob, contact, address]
  );
  res.status(201).json(result.rows[0]);
});

router.put('/:id', adminOnly, async (req, res) => {
  const { id } = req.params;
  const { full_name, dob, contact, address } = req.body;
  const result = await db.query(
    'UPDATE patients SET full_name=$1, dob=$2, contact=$3, address=$4 WHERE id=$5 RETURNING *',
    [full_name, dob, contact, address, id]
  );
  res.json(result.rows[0]);
});

router.delete('/:id', adminOnly, async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM patients WHERE id=$1', [id]);
  res.sendStatus(204);
});

module.exports = router;
