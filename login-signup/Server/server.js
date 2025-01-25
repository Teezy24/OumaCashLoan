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
  password: "israel",
  database: "loan",
});

db.connect((err) => {
  if (err) {
    console.error("error connecting to MySQL:", err);
  } else {
    console.log("connected to MySQL");
  }
});

// API routes for login/signup
// Signup Route
app.post("/signup", (req, res) => {
  const {
    fullName,
    email,
    password,
    phoneNumber,
    residentialAddress,
    postalAddress,
    role,
  } = req.body;

  const query =
    "INSERT INTO users (full_name, email, password_hash, phone_number, residential_address, postal_address, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [
      fullName,
      email,
      password,
      phoneNumber,
      residentialAddress,
      postalAddress,
      role,
    ],
    (err, result) => {
      if (err) {
        console.error("Error during signup:", err);
        return res.status(500).send("Error during signup");
      }
      res.status(200).send("Signup successful!");
    }
  );
});

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ? AND password_hash = ?";
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).send("Error during login");
    }
    if (result.length > 0) {
      res.status(200).send("Login successful!");
    } else {
      res.status(400).send("Invalid email or password");
    }
  });
});

app.get("/", (re, res) => {
  return res.json("From Backend Side");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
