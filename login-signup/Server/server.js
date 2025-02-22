require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require('http');
const setupSocket = require('./socket/socket');
const messageRoutes = require('./routes/messageRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'lionel messi',
  database: process.env.DB_DATABASE || 'loan',
});

// Make db connection available globally
global.db = db.promise();

db.connect((err) => {
  if (err) {
    console.error("error connecting to MySQL:", err);
  } else {
    console.log("connected to MySQL");
  }
});

// Routes
app.use('/api/messages', messageRoutes);
app.use('/api/conversations', conversationRoutes);

// Test Database Connection Route
app.get("/test-db", async (req, res) => {
  try {
    const [result] = await db.promise().query("SELECT 1");
    res.json({ message: "Database connection successful", result });
  } catch (err) {
    res.status(500).json({ 
      error: "Database connection failed", 
      details: err.message 
    });
  }
});

// Signup Route
app.post("/signup", async (req, res) => {
  const {
    fullName,
    email,
    password,
    phoneNumber,
    residentialAddress,
    postalAddress,
    idNumber,
    role,
  } = req.body;

  try {
    const [result] = await db.promise().query(
      "INSERT INTO users (full_name, email, password_hash, phone_number, residential_address, postal_address, id_number, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [fullName, email, password, phoneNumber, residentialAddress, postalAddress, idNumber, role]
    );
    
    const userId = result.insertId;
    io.emit('newUser', { userId, fullName });
    
    res.status(201).json({ 
      message: "Signup successful!",
      userId 
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ error: err.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.promise().query(
      "SELECT * FROM users WHERE email = ? AND password_hash = ?",
      [email, password]
    );

    if (users.length > 0) {
      const user = users[0];
      io.emit('userLoggedIn', { 
        userId: user.user_id,
        role: user.role 
      });
      
      res.status(200).json({ 
        message: "Login successful!", 
        user: {
          id: user.user_id,
          fullName: user.full_name,
          email: user.email,
          role: user.role
        }
      });
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ 
      error: "Internal server error. Please try again later." 
    });
  }
});

// Home route
app.get("/", (req, res) => {
  res.json({ message: "API Server Running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const SOCKET_PORT = process.env.SOCKET_PORT || 8800;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.IO listening on port ${SOCKET_PORT}`);
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    db.end();
    console.log('Server shutdown complete');
  });
});