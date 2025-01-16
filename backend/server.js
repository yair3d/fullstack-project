const express = require('express');
const cors = require('cors');
const { pool } = require('./db');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/data', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM usuarios ORDER BY id ASC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/data', async (req, res) => {
  const { nombre, correo, edad } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO usuarios (nombre, correo, edad) VALUES ($1, $2, $3) RETURNING *',
      [nombre, correo, edad]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/data/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

