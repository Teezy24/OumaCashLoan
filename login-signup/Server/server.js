const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lionel messi",
  database: "loan",
});

db.connect((err) => {
  if (err) {
    console.error("error connecting to MySQL:", err);
  } else {
    console.log("connected to MySQL");
  }
});

// Existing authentication routes
app.post("/signup", (req, res) => {
  const { fullName, email, password, phoneNumber, residentialAddress, postalAddress, idNumber, role } = req.body;
  const query = "INSERT INTO users (full_name, email, password_hash, phone_number, residential_address, postal_address, id_number, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  
  db.query(query, [fullName, email, password, phoneNumber, residentialAddress, postalAddress, idNumber, role], (err, result) => {
    if (err) {
      console.error("Error during signup:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send("Signup successful!");
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.promise().query(
      "SELECT user_id, full_name, email, role FROM users WHERE email = ? AND password_hash = ?",
      [email, password]
    );

    if (users.length > 0) {
      const user = users[0];
      res.status(200).json({ 
        message: "Login successful!",
        user: {
          user_id: user.user_id,
          full_name: user.full_name,
          email: user.email,
          role: user.role
        }
      });
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add this new route after your existing routes
app.get("/api/users/clients", async (req, res) => {
  try {
    const [clients] = await db.promise().query(
      'SELECT user_id, full_name, email FROM users WHERE role = "client"'
    );
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Chat system routes
// Get or create conversation between client and admin
app.get("/api/conversations/admin/:adminId", async (req, res) => {
  const adminId = req.params.adminId;
  
  try {
    const [conversations] = await db.promise().query(
      `SELECT c.*, 
        u.full_name as client_name,
        u.user_id as client_id,
        (SELECT message_text 
         FROM messages 
         WHERE conversation_id = c.conversation_id 
         ORDER BY created_at DESC LIMIT 1) as last_message
      FROM conversations c
      JOIN users u ON c.client_id = u.user_id
      WHERE c.admin_id = ?
      ORDER BY c.updated_at DESC`,
      [adminId]
    );
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/conversations/client/:clientId", async (req, res) => {
  const clientId = req.params.clientId;
  
  try {
    // First try to find existing conversation
    let [conversation] = await db.promise().query(
      `SELECT c.*, u.full_name as admin_name 
       FROM conversations c 
       JOIN users u ON c.admin_id = u.user_id 
       WHERE c.client_id = ?`,
      [clientId]
    );

    if (conversation.length === 0) {
      // Find available admin and create conversation
      const [admins] = await db.promise().query(
        'SELECT user_id FROM users WHERE role = "admin" LIMIT 1'
      );
      
      if (admins.length === 0) {
        return res.status(404).json({ error: "No admin available" });
      }

      const [result] = await db.promise().query(
        'INSERT INTO conversations (client_id, admin_id) VALUES (?, ?)',
        [clientId, admins[0].user_id]
      );

      [conversation] = await db.promise().query(
        `SELECT c.*, u.full_name as admin_name 
         FROM conversations c 
         JOIN users u ON c.admin_id = u.user_id 
         WHERE c.conversation_id = ?`,
        [result.insertId]
      );
    }

    res.json(conversation[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get messages for a conversation
app.get("/api/messages/:conversationId", async (req, res) => {
  try {
    const [messages] = await db.promise().query(
      `SELECT m.*, u.full_name as sender_name, u.role as sender_role
       FROM messages m
       JOIN users u ON m.sender_id = u.user_id
       WHERE m.conversation_id = ?
       ORDER BY m.created_at ASC`,
      [req.params.conversationId]
    );
    res.json(messages);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new message
app.post("/api/messages", async (req, res) => {
  const { conversation_id, sender_id, message_text } = req.body;

  try {
    // Verify sender exists and has access to conversation
    const [access] = await db.promise().query(
      `SELECT * FROM conversations c
       WHERE c.conversation_id = ? 
       AND (c.client_id = ? OR c.admin_id = ?)`,
      [conversation_id, sender_id, sender_id]
    );

    if (access.length === 0) {
      return res.status(403).json({ error: "Not authorized to send messages in this conversation" });
    }

    const [result] = await db.promise().query(
      'INSERT INTO messages (conversation_id, sender_id, message_text) VALUES (?, ?, ?)',
      [conversation_id, sender_id, message_text]
    );

    const [message] = await db.promise().query(
      `SELECT m.*, u.full_name as sender_name, u.role as sender_role
       FROM messages m
       JOIN users u ON m.sender_id = u.user_id
       WHERE m.message_id = ?`,
      [result.insertId]
    );

    const newMessage = message[0];
    io.to(`conversation:${conversation_id}`).emit("receive_message", newMessage);
    res.status(201).json(newMessage);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new conversation
app.post("/api/conversations", async (req, res) => {
  const { client_id, admin_id } = req.body;
  
  try {
    // Check if conversation already exists
    const [existing] = await db.promise().query(
      'SELECT * FROM conversations WHERE (client_id = ? AND admin_id = ?) OR (client_id = ? AND admin_id = ?)',
      [client_id, admin_id, admin_id, client_id]
    );

    if (existing.length > 0) {
      return res.json(existing[0]);
    }

    const [result] = await db.promise().query(
      'INSERT INTO conversations (client_id, admin_id) VALUES (?, ?)',
      [client_id, admin_id]
    );

    const [conversation] = await db.promise().query(
      `SELECT c.*, u.full_name as title
       FROM conversations c
       JOIN users u ON (c.client_id = u.user_id OR c.admin_id = u.user_id)
       WHERE c.conversation_id = ? AND u.user_id != ?`,
      [result.insertId, client_id]
    );

    res.status(201).json(conversation[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_conversation", (conversationId) => {
    socket.join(`conversation:${conversationId}`);
    console.log(`User ${socket.id} joined conversation ${conversationId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});