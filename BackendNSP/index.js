const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // ระบุ origin ที่อนุญาต
  methods: ['GET', 'POST'], // ระบุ HTTP methods ที่อนุญาต
  credentials: true, // ถ้าจำเป็นต้องใช้ cookies หรือ authorization headers
}));
// Middleware
app.use(express.json()); // สำหรับ JSON payload
app.use(express.urlencoded({ extended: true })); // สำหรับ URL-encoded payload


// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/', require('./routes/nurse.route'));
app.use('/', require('./routes/login.route'));
// Basic route
// app.get('/', (req, res) => {
//   res.send('Welcome to the API');
// });

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

