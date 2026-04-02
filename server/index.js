import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data.json');

// Read data
app.get('/api/content', (req, res) => {
  try {
    const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
    const data = JSON.parse(rawData);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// Update entire data
app.post('/api/content', (req, res) => {
  try {
    const newData = req.body;
    fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2), 'utf-8');
    res.json({ success: true, message: 'Data updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Secure admin route check (simple hardcoded generic auth)
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (password === 'admin123') { // Simple default password for the demo
    res.json({ success: true, token: 'fake-jwt-token-123' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`);
});
