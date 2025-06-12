const express = require('express');
const router = express.Router();
const db = require('../db');
const adminOnly = require('../middleware/adminOnly'); 


router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM prescriptions ORDER BY id');
  res.json(result.rows);
});


router.post('/', adminOnly, async (req, res) => {
  const { patient_name, doctor_name, date_issued, status } = req.body;
  const result = await db.query(
    'INSERT INTO prescriptions (patient_name, doctor_name, date_issued, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [patient_name, doctor_name, date_issued, status]
  );
  res.status(201).json(result.rows[0]);
});


router.put('/:id', adminOnly, async (req, res) => {
  const { id } = req.params;
  const { patient_name, doctor_name, date_issued, status } = req.body;
  const result = await db.query(
    'UPDATE prescriptions SET patient_name=$1, doctor_name=$2, date_issued=$3, status=$4 WHERE id=$5 RETURNING *',
    [patient_name, doctor_name, date_issued, status, id]
  );
  res.json(result.rows[0]);
});


router.delete('/:id', adminOnly, async (req, res) => {
  await db.query('DELETE FROM prescriptions WHERE id=$1', [req.params.id]);
  res.sendStatus(204);
});

module.exports = router;
