const express = require('express');
const multer = require('multer');
const db = require('./db');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), (req, res) => {
  const { title, description } = req.body;
  const file = req.file.path;

  const sql = 'INSERT INTO projects (title, description, file) VALUES (?, ?, ?)';
  db.query(sql, [title, description, file], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, title, description, file });
  });
});

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM projects';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
