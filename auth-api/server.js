const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'super-secret-mfe-key-2026'; // In production, this goes in .env

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5001', 'http://localhost:5002', 'http://localhost:5003', 'http://localhost:5004'],
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

// Initialize SQLite Database
const dbPath = path.resolve(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Error connecting to SQLite:', err.message);
  else console.log('Connected to SQLite database.');
});

// Create users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )
`);

// ------------------------------------------
// 1. REGISTER ENDPOINT
// ------------------------------------------
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (user) return res.status(400).json({ error: 'Email already registered.' });

    db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], function(err) {
      if (err) return res.status(500).json({ error: 'Failed to create user.' });
      
      // Auto-login after register
      const token = jwt.sign({ id: this.lastID, name, email }, JWT_SECRET, { expiresIn: '1d' });
      res.cookie('jwt_token', token, {
        httpOnly: true,
        secure: false, // Set to true in prod with HTTPS
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });
      res.status(201).json({ message: 'User created successfully', user: { name, email } });
    });
  });
});

// ------------------------------------------
// 2. LOGIN ENDPOINT
// ------------------------------------------
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    
    // The magic of Single Sign-On: The HttpOnly Cookie!
    res.cookie('jwt_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });
    
    res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  });
});

// ------------------------------------------
// 3. ME (SESSION VALIDATION) ENDPOINT
// ------------------------------------------
app.get('/api/auth/me', (req, res) => {
  const token = req.cookies.jwt_token;

  if (!token) {
    return res.status(401).json({ error: 'No active session.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: decoded });
  } catch (err) {
    res.clearCookie('jwt_token');
    res.status(401).json({ error: 'Session expired.' });
  }
});

// ------------------------------------------
// 4. LOGOUT ENDPOINT
// ------------------------------------------
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('jwt_token');
  res.json({ message: 'Logged out successfully' });
});

app.listen(PORT, () => {
  console.log(`Auth Backend running on http://localhost:${PORT}`);
});
