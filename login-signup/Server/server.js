const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
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

// Test Database Connection Route
app.get("/test-db", (req, res) => {
  db.query("SELECT 1", (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database connection failed", details: err.message });
    }
    res.json({ message: "Database connection successful", result });
  });
});

// Signup Route
app.post("/signup", (req, res) => {
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

  const query =
    "INSERT INTO users (full_name, email, password_hash, phone_number, residential_address, postal_address, id_number, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  
  db.query(query, [
    fullName,
    email,
    password,
    phoneNumber,
    residentialAddress,
    postalAddress,
    idNumber,
    role,
  ], (err, result) => {
    if (err) {
      console.error("Error during signup:", err);

      return res.status(500).json({ error: err.message });
    }
    res.status(200).send("Signup successful!");
  });
});


// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ? AND password_hash = ?";
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).json({ error: "Internal server error. Please try again later." });
    }

    if (result.length > 0) {
      const user = result[0];
      res.status(200).json({ message: "Login successful!", user });
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  });
});


app.get("/", (re, res) => {
  return res.json("From Backend Side");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
