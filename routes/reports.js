const express = require('express');
const router = express.Router();
const db = require('../db');
const adminOnly = require('../middleware/adminOnly');


router.get('/inventory-summary', adminOnly, async (req, res) => {
  const result = await db.query(`
    SELECT item_name, SUM(quantity) AS total_quantity
    FROM inventory
    GROUP BY item_name
    ORDER BY item_name
  `);
  res.json(result.rows);
});


router.get('/prescription-status', adminOnly, async (req, res) => {
  const result = await db.query(`
    SELECT status, COUNT(*) AS count
    FROM prescriptions
    GROUP BY status
  `);
  res.json(result.rows);
});

module.exports = router;
