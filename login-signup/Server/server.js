const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require('http');
const { Server } = require("socket.io");
const multer = require('multer');
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Ensures form data is properly parsed

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"]
  }
});

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "lionel messi",
  database: "loan",
});

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true  // Allows sending session cookies
}));

db.connect((err) => {
  if (err) {
    console.error("error connecting to MySQL:", err);
  } else {
    console.log("connected to MySQL");
  }
});

// Configure session store
const sessionStore = new MySQLStore({}, db.promise());

// Configure session middleware
app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Change to true in production (HTTPS)
    httpOnly: true,
    sameSite: "lax",  // Ensures cookies are isolated per tab
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));

// Existing authentication routes
app.post("/signup", async (req, res) => {
  const { full_name, email, password, phoneNumber, residentialAddress, postalAddress, idNumber, role } = req.body;
  // No hashing of password
  const query = "INSERT INTO users (full_name, email, password_hash, phone_number, residential_address, postal_address, id_number, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  
  db.query(query, [full_name, email, password, phoneNumber, residentialAddress, postalAddress, idNumber, role], (err, result) => {
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
      "SELECT user_id, full_name, email, password_hash, role FROM users WHERE email = ?",
      [email]
    );

    if (users.length > 0) {
      const user = users[0];
      const match = (password === user.password_hash); // Compare the password directly

      if (match) {
        // ✅ Store user details in session
        req.session.user = {
          user_id: user.user_id,
          full_name: user.full_name,
          email: user.email,
          role: user.role
        };

        res.status(200).json({
          message: "Login successful!",
          user: req.session.user
        });

      } else {
        res.status(400).json({ error: "Invalid email or password" });
      }
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('api/auth/session', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

app.get('/api/auth/user', (req, res) => {
  const user_id = req.session.user_id; // Get user ID from session

  if (!user_id) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const query = 'SELECT user_id, full_name, email, phone_number, residential_address, postal_address, id_number FROM users WHERE user_id = ?';

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching user details:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results[0]);
  });
});

// Endpoint to fetch loan applications for the logged-in user
app.get('/api/user/loanApplications', (req, res) => {
  const user_id = req.session.user.user_id; // Get user_id from session
  if (!user_id) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const query = 'SELECT * FROM loan_applications WHERE user_id = ?';
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching loan applications:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});

app.get('/api/user/:id', (req, res) => {
  const user_id = req.params.id;
  const query = 'SELECT user_id, full_name, email, phone_number, residential_address, postal_address, id_number FROM users WHERE user_id = ?';

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching user details:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results[0]);
  });
});

// Endpoint to update user details
app.put('/api/user/:id', (req, res) => {
  const user_id = req.params.id;
  const { full_name, email, phone_number, residential_address, postal_address, id_number } = req.body;
  const query = 'UPDATE users SET full_name = ?, email = ?, phone_number = ?, residential_address = ?, postal_address = ?, id_number = ? WHERE user_id = ?';

  db.query(query, [full_name, email, phone_number, residential_address, postal_address, id_number, user_id], (err, result) => {
    if (err) {
      console.error('Error updating user details:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'User details updated successfully' });
  });
});



// Other routes...

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

// Add this endpoint at an appropriate location in your server.js file

app.get('/api/placeholder/:width/:height', (req, res) => {
  const { width, height } = req.params;
  res.status(200).json({ message: `Placeholder for ${width}x${height}` });
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
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Endpoint to fetch all loan applications
app.get('/api/loanApplications', (req, res) => {
  const query = 'SELECT * FROM loan_applications';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching loan applications:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
});

// Endpoint to handle form submissions
app.post('/api/loanApplication', (req, res) => {
  console.log("Received form data:", req.body); // Debugging step

  const user_id = req.session.user_id; // Get user ID from session
  const { full_name, phoneNumber, email, postalAddress, nationalId, netSalary, loanAmount, period, transferMethod, description } = req.body;

  if (!user_id) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (!full_name || !phoneNumber || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = 'INSERT INTO loan_applications (user_id, full_name, phone_number, email, postal_address, national_id, net_salary, loan_amount, period, transfer_method, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(query, [user_id, full_name, phoneNumber, email, postalAddress, nationalId, netSalary, loanAmount, period, transferMethod, description], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json({ id: result.insertId });
  });
});

// Endpoint to update loan application status
app.put('/api/loanApplications/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const query = 'UPDATE loan_applications SET status = ? WHERE id = ?';

  db.query(query, [status, id], (err, result) => {
    if (err) {
      console.error('Error updating loan application status:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'Loan application status updated successfully' });
  });
});

// Endpoint to delete a loan application
app.delete('/api/loanApplications/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM loan_applications WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting loan application:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'Loan application deleted successfully' });
  });
});

// Endpoint to handle file uploads
app.post('/api/uploadDocuments', upload.array('files'), (req, res) => {
  const loanApplicationId = req.body.loanApplicationId;
  const files = req.files;

  files.forEach(file => {
    const query = 'INSERT INTO loan_documents (loan_application_id, filename, path, size) VALUES (?, ?, ?, ?)';
    db.query(query, [loanApplicationId, file.filename, file.path, file.size], (err, result) => {
      if (err) throw err;
    });
  });

  res.send('Documents uploaded successfully');
});