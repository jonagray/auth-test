'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const dotenv = require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors());
app.use(express.json()); //req.body

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}


console.log(__dirname);
console.log(path.join(__dirname, "client/build"));
// Routes

// Register and login routes
app.use("/auth", require("./routes/jwtAuth"));

// Dashboard route
app.use("/dashboard", require("./routes/dashboard"));


// Routes for consumer DB

// Create a user
app.post("/users", async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const newUser = await pool.query("INSERT INTO users (name, email, address) VALUES($1, $2, $3) RETURNING *",
    [name, email, address]
    );

    res.json(newUser.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Get all users
app.get("/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users ORDER BY user_id");
    res.json(allUsers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Get a user
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);

    res.json(users.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Update a user
app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, address } = req.body;
    const updateUser = await pool.query("UPDATE users SET name = $1, email = $2, address = $3 WHERE user_id = $4", [name, email, address, id]
    );

    res.json("User was updated!");
  } catch (error) {
    console.error(error.message);
  }
});

// Delete a user
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query("DELETE FROM users WHERE user_id = $1", [id]);
    res.json("User was deleted!");
  } catch (error) {
    console.error(error.message);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT || 5000, () => {
  console.log(`Server is running on port ${PORT}`);
});