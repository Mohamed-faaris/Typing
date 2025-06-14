const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Schema + Model
const resultSchema = new mongoose.Schema({
  SNo: Number,
  username: String,
  WPM: Number,
  CPM: Number,
  mistakes: Number,
  typingDuration: Number,
  date: { type: Date, default: Date.now },
});

const Result = mongoose.model('Result', resultSchema);

// Serve React static files (IMPORTANT: before any other routes!)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// API Routes
app.post('/results', async (req, res) => {
  const newResult = new Result(req.body);
  try {
    await newResult.save();
    res.status(201).json(newResult);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get('/results', async (req, res) => {
  try {
    const results = await Result.find().sort({ date: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// React fallback (for SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
