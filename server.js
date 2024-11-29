const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'registration_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

// API to get states based on country
app.get('/api/states/:country', (req, res) => {
  const country = req.params.country;
  db.query('SELECT * FROM states WHERE country = ?', [country], (err, results) => {
    if (err) throw err;
    res.json(results.map((row) => row.state));
  });
});

// API to get cities based on state
app.get('/api/cities/:state', (req, res) => {
  const state = req.params.state;
  db.query('SELECT * FROM cities WHERE state = ?', [state], (err, results) => {
    if (err) throw err;
    res.json(results.map((row) => row.city));
  });
});

// API to register a new user
app.post('/api/register', (req, res) => {
  const { name, username, password, country, state, city } = req.body;
  
  db.query('INSERT INTO users (name, username, password, country, state, city) VALUES (?, ?, ?, ?, ?, ?)', 
  [name, username, password, country, state, city], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Registration failed' });
    }
    res.json({ success: true, message: 'User registered successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
