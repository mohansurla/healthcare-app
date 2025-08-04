const express = require('express');
const cors = require('cors');
const path = require('path');
const doctors = require(path.join(__dirname, 'data', 'doctors.json'));

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.get('/doctors', (req, res) => {
  res.json(doctors);
});

app.post('/appointments', (req, res) => {
  const { name, email, date, time, doctorId } = req.body;
  if (!name || !email || !date || !time || !doctorId) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  res.json({ message: 'Appointment booked successfully!' });
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all for React Router - handle all non-API routes
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
